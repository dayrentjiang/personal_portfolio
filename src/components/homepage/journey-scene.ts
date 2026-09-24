import * as THREE from "three";
import type { RefObject } from "react";
import { journeyLayout, journeyOverviewX } from "./journey-motion";

// A small scene built from geometry, without external model downloads or controls.
export function createJourneyScene(
  host: HTMLDivElement,
  progressRef: RefObject<number>,
  markersRef: RefObject<(HTMLButtonElement | null)[]>,
) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-11, 11, 7, -7, .1, 100);
  const material = (color: number, roughness = .8, metalness = 0) => new THREE.MeshStandardMaterial({ color: new THREE.Color(color).convertSRGBToLinear(), roughness, metalness });
  const groundMaterial = material(0xe8e9e2);
  const roadMaterial = material(0xb7c6c6);
  roadMaterial.side = THREE.DoubleSide;
  const roadEdgeMaterial = material(0xd5ddda);
  roadEdgeMaterial.side = THREE.DoubleSide;
  const paint = material(0x647e8a, .35, .3);
  const trim = material(0x34454b, .55);
  const glass = material(0x263e4b, .16, .25);
  const rubber = material(0x303b3d, .95);
  const alloy = material(0xc1cbcb, .3, .65);
  const white = material(0xf4f3e9);

  scene.add(new THREE.HemisphereLight(0xf9fcff, 0xaca597, .65));
  const sun = new THREE.DirectionalLight(0xfff6e7, .9);
  sun.position.set(-5, 11, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -13, right: 13, top: 10, bottom: -10, near: 1, far: 35 });
  sun.shadow.normalBias = .04;
  sun.shadow.bias = -.0003;
  scene.add(sun);
  scene.add(sun.target);
  const fill = new THREE.DirectionalLight(0xc4dfe8, .3);
  fill.position.set(7, 5, -6);
  scene.add(fill);

  function roundedGeometry(width: number, height: number, depth: number, radius: number) {
    const x = -width / 2, y = -height / 2;
    const r = Math.min(radius, width / 2, height / 2);
    const shape = new THREE.Shape();
    shape.moveTo(x + r, y);
    shape.lineTo(x + width - r, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + r);
    shape.lineTo(x + width, y + height - r);
    shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    shape.lineTo(x + r, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    const bevel = Math.min(.035, depth / 4);
    const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 5 });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function mesh(geometry: THREE.BufferGeometry, surface: THREE.Material, parent: THREE.Object3D, x = 0, y = 0, z = 0) {
    const object = new THREE.Mesh(geometry, surface);
    object.position.set(x, y, z);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }

  const layout = journeyLayout(markersRef.current.length);
  const ground = mesh(roundedGeometry(layout.width, 12.5, .22, 1), groundMaterial, scene, layout.centerX, -.22, 0);
  ground.rotation.x = -Math.PI / 2;
  ground.castShadow = false;

  const points = layout.points.map(point => new THREE.Vector3(point.x, .04, point.z));
  const legs = Math.max(1, points.length - 1);
  const route = new THREE.CatmullRomCurve3(points, false, "catmullrom", .65);
  // The visible road continues to the island edge; driving still ends at the last job.
  const lastStop = points[points.length - 1];
  const exitTangent = route.getTangent(1);
  const exit = new THREE.Vector3(layout.centerX + layout.width / 2 + .03, .04, lastStop.z + Math.sign(exitTangent.z) * .65);
  const onwardRoad = new THREE.CubicBezierCurve3(
    lastStop.clone(),
    lastStop.clone().addScaledVector(exitTangent, 1.1),
    exit.clone().add(new THREE.Vector3(-1, 0, 0)),
    exit,
  );
  function road(width: number, height: number, surface: THREE.Material, curve: THREE.Curve<THREE.Vector3> = route) {
    const vertices: number[] = [], indices: number[] = [];
    const segments = legs * 80;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const point = curve.getPoint(t), tangent = curve.getTangent(t);
      const normal = new THREE.Vector3(tangent.z, 0, -tangent.x).normalize().multiplyScalar(width / 2);
      vertices.push(point.x + normal.x, height, point.z + normal.z, point.x - normal.x, height, point.z - normal.z);
      if (i < segments) { const a = i * 2; indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    const object = mesh(geometry, surface, scene);
    object.castShadow = false;
  }
  road(1.25, -.015, roadEdgeMaterial);
  road(1.02, .005, roadMaterial);
  road(1.25, -.015, roadEdgeMaterial, onwardRoad);
  road(1.02, .005, roadMaterial, onwardRoad);
  const dashGeometry = new THREE.BoxGeometry(.035, .009, .18);
  for (let i = 0; i <= legs * 19; i++) {
    const t = i / (legs * 19);
    const point = route.getPoint(t), tangent = route.getTangent(t);
    const dash = mesh(dashGeometry, white, scene, point.x, .023, point.z);
    dash.rotation.y = Math.atan2(tangent.x, tangent.z);
    dash.castShadow = false;
  }
  const onwardDashes = Math.ceil(onwardRoad.getLength() / .36);
  for (let i = 1; i < onwardDashes; i++) {
    const t = i / onwardDashes;
    const point = onwardRoad.getPointAt(t), tangent = onwardRoad.getTangentAt(t);
    const dash = mesh(dashGeometry, white, scene, point.x, .023, point.z);
    dash.rotation.y = Math.atan2(tangent.x, tangent.z);
    dash.castShadow = false;
  }

  const stationAnchors = points.map((point) => {
    mesh(new THREE.CylinderGeometry(.48, .58, .12, 40), white, scene, point.x, .04, point.z - 1.02);
    const ring = mesh(new THREE.TorusGeometry(.43, .025, 6, 40), alloy, scene, point.x, .11, point.z - 1.02);
    ring.rotation.x = -Math.PI / 2;
    return new THREE.Vector3(point.x, .14, point.z - 1.02);
  });

  const foliage = material(0xaab7a3);
  const trunk = material(0xb1a396);
  const crowns: THREE.Mesh[] = [];
  for (let index = 0; index < points.length; index++) {
    const x = points[index].x - .8;
    const z = index % 2 ? 4.7 : -4.3;
    const height = 1.1 + (index % 3) * .15;
    mesh(new THREE.CylinderGeometry(.065, .09, height * .65, 7), trunk, scene, x, height * .3, z);
    const crown = mesh(new THREE.IcosahedronGeometry(.48, 1), foliage, scene, x, height, z);
    crown.scale.set(.8, 1.3, .8);
    crowns.push(crown);
  }

  for (let index = 0; index < points.length; index++) {
    const x = points[index].x + 1.1;
    const z = index % 2 ? -4.2 : 4.7;
    const rock = mesh(new THREE.IcosahedronGeometry(.24, 0), material(0xd3d5cc), scene, x, .05, z);
    rock.scale.set(1.4, .7, 1);
    rock.rotation.y = x;
  }

  // Sculpted compact car: separate body, glazed cabin, roof, lights and rolling wheels.
  const car = new THREE.Group();
  car.scale.setScalar(1.18);
  scene.add(car);
  mesh(roundedGeometry(.98, .31, 1.8, .11), paint, car, 0, .39, 0);
  mesh(roundedGeometry(1.01, .12, 1.74, .05), trim, car, 0, .25, 0);
  const cabinShape = new THREE.Shape();
  cabinShape.moveTo(-.55, 0); cabinShape.lineTo(.55, 0); cabinShape.lineTo(.32, .4); cabinShape.lineTo(-.3, .4); cabinShape.closePath();
  const cabinGeometry = new THREE.ExtrudeGeometry(cabinShape, { depth: .77, bevelEnabled: true, bevelThickness: .025, bevelSize: .025, bevelSegments: 2, steps: 1 });
  cabinGeometry.translate(0, 0, -.385);
  cabinGeometry.rotateY(Math.PI / 2);
  mesh(cabinGeometry, glass, car, 0, .53, -.15);
  mesh(roundedGeometry(.73, .055, .64, .025), paint, car, 0, .94, -.16);
  for (const x of [-.405, .405]) mesh(new THREE.BoxGeometry(.025, .33, .05), paint, car, x, .7, -.15);
  const lightMaterial = new THREE.MeshStandardMaterial({ color: 0xfff4db, emissive: 0xffecc6, emissiveIntensity: .45, roughness: .25 });
  const rearLight = material(0xa56b60, .4);
  for (const x of [-.3, .3]) {
    mesh(roundedGeometry(.23, .075, .035, .025), lightMaterial, car, x, .45, .927);
    mesh(roundedGeometry(.21, .055, .035, .018), rearLight, car, x, .44, -.927);
    mesh(roundedGeometry(.1, .065, .15, .025), paint, car, x < 0 ? -.54 : .54, .66, .08);
  }
  mesh(roundedGeometry(.39, .085, .035, .025), trim, car, 0, .31, .93);
  mesh(new THREE.BoxGeometry(.65, .025, .035), alloy, car, 0, .25, .93);
  const wheels: THREE.Group[] = [];
  const frontAxles: THREE.Group[] = [];
  for (const x of [-.51, .51]) for (const z of [-.59, .59]) {
    const axle = new THREE.Group(); axle.position.set(x, .23, z); car.add(axle);
    if (z > 0) frontAxles.push(axle);
    const wheel = new THREE.Group(); axle.add(wheel); wheels.push(wheel);
    const tire = mesh(new THREE.CylinderGeometry(.235, .235, .16, 24), rubber, wheel);
    tire.rotation.z = Math.PI / 2;
    const rim = mesh(new THREE.CylinderGeometry(.135, .135, .172, 12), alloy, wheel);
    rim.rotation.z = Math.PI / 2;
    mesh(new THREE.BoxGeometry(.18, .035, .2), trim, wheel);
  }

  let width = 1, height = 1, frame = 0, visible = true, disposed = false;
  let displayedProgress = progressRef.current;
  let cameraFocus = 0;
  let windTime = 0;
  let lastTime = 0;
  const projected = new THREE.Vector3();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function render(time = 0) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const dt = Math.min((time - lastTime) / 1000 || .016, .05);
    lastTime = time;
    const target = progressRef.current;
    displayedProgress = reducedMotion.matches ? target : THREE.MathUtils.lerp(displayedProgress, target, 1 - Math.exp(-dt * 9));
    if (Math.abs(displayedProgress - target) < .00005) displayedProgress = target;
    const point = route.getPoint(displayedProgress), tangent = route.getTangent(displayedProgress);
    car.position.copy(point);
    car.rotation.y = Math.atan2(tangent.x, tangent.z);
    wheels.forEach(wheel => { wheel.rotation.x = displayedProgress * legs * 32.5; });
    const next = route.getTangent(Math.min(1, displayedProgress + .06 / legs));
    const turning = tangent.z * next.x - tangent.x * next.z;
    frontAxles.forEach(axle => { axle.rotation.y = THREE.MathUtils.clamp(turning * 2, -.35, .35); });
    const mobile = width < 600;
    // Each leg starts and ends with the full route in view. Between stops,
    // ease toward the car, including when the visitor pauses mid-journey.
    const leg = displayedProgress * (points.length - 1);
    const distanceFromStop = Math.abs(leg - Math.round(leg));
    const focusTarget = reducedMotion.matches ? 0 : THREE.MathUtils.smoothstep(distanceFromStop, .025, .24);
    cameraFocus = reducedMotion.matches ? 0 : THREE.MathUtils.lerp(cameraFocus, focusTarget, 1 - Math.exp(-dt * 6));
    if (Math.abs(cameraFocus - focusTarget) < .0001) cameraFocus = focusTarget;
    const overviewX = journeyOverviewX(point.x, layout.startX, layout.endX);
    const centerX = THREE.MathUtils.lerp(overviewX, point.x + tangent.x * .25, cameraFocus);
    const centerZ = THREE.MathUtils.lerp(0, point.z + tangent.z * .25, cameraFocus);
    const halfWidth = THREE.MathUtils.lerp(11.4, mobile ? 4.7 : 4.9, cameraFocus);
    camera.left = -halfWidth; camera.right = halfWidth;
    camera.top = halfWidth * height / width; camera.bottom = -camera.top;
    camera.position.set(centerX, 13, centerZ + 15);
    camera.lookAt(centerX, cameraFocus * .25, centerZ);
    sun.position.x = centerX - 5;
    sun.target.position.x = centerX;
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    stationAnchors.forEach((anchor, index) => {
      const marker = markersRef.current[index];
      if (!marker) return;
      projected.copy(anchor).project(camera);
      const markerX = (projected.x * .5 + .5) * width;
      const markerY = (-projected.y * .5 + .5) * height;
      const margin = marker.offsetWidth / 2 + 4;
      marker.style.left = `${markerX}px`;
      marker.style.top = `${markerY}px`;
      marker.style.visibility = markerX < margin || markerX > width - margin || markerY < marker.offsetHeight + 4 || markerY > height - 4 ? "hidden" : "visible";
    });
    host.parentElement?.style.setProperty("--camera-focus", cameraFocus.toFixed(3));
    if (!reducedMotion.matches) windTime += dt;
    crowns.forEach((crown, index) => { crown.rotation.z = reducedMotion.matches ? 0 : Math.sin(windTime * 1.1 + index) * .035; });
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }

  function resize() {
    width = Math.max(1, host.clientWidth); height = Math.max(1, host.clientHeight);
    renderer.setSize(width, height);
    if (!frame) frame = requestAnimationFrame(render);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  const resume = () => { if (!document.hidden && visible && !frame) frame = requestAnimationFrame(render); };
  document.addEventListener("visibilitychange", resume);
  resize();

  return {
    setVisible(value: boolean) { visible = value; if (value) resume(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", resume);
      const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          geometries.add(object.geometry);
          (Array.isArray(object.material) ? object.material : [object.material]).forEach(surface => materials.add(surface));
        }
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(surface => surface.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
