declare module "vanta/dist/vanta.globe.min" {
  import type { WebGLRenderer } from "three";

  export interface GlobeEffect {
    destroy(): void;
    renderer?: WebGLRenderer;
  }

  export default function globe(options: {
    el: HTMLElement;
    THREE: typeof import("three");
    mouseControls: boolean;
    touchControls: boolean;
    gyroControls: boolean;
    minHeight: number;
    minWidth: number;
    scale: number;
    scaleMobile: number;
    backgroundColor: number;
    color: number;
    color2: number;
    size: number;
    points: number;
    maxDistance: number;
    spacing: number;
    showDots: boolean;
  }): GlobeEffect;
}
