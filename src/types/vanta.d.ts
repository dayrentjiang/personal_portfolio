declare module "vanta/dist/vanta.clouds2.min" {
  import type { Texture, WebGLRenderer } from "three";

  export interface CloudsEffect {
    destroy(): void;
    renderer?: WebGLRenderer;
    uniforms?: { iTex?: { value: Texture } };
  }

  export default function clouds(options: {
    el: HTMLElement;
    THREE: typeof import("three");
    mouseControls: boolean;
    touchControls: boolean;
    gyroControls: boolean;
    minHeight: number;
    minWidth: number;
    scale: number;
    scaleMobile: number;
    texturePath: string;
    backgroundColor: number;
    skyColor: number;
    cloudColor: number;
    lightColor: number;
    speed: number;
  }): CloudsEffect;
}
