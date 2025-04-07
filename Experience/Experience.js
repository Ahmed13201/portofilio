import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Theme from "./Theme.js";
import Renderer from "./Renderer.js";
import Preloader from "./Preloader.js";

import World from "./World/World.js";
import Controls from "./World/Controls.js";

export default class Experience {
    document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowDown':
      // Scroll down or go to next section
      document.getElementById('section-2').scrollIntoView({ behavior: 'smooth' });
      break;
    case 'ArrowUp':
      // Scroll up or go to previous section
      document.getElementById('section-1').scrollIntoView({ behavior: 'smooth' });
      break;
    case 'ArrowRight':
      // Custom behavior for right arrow
      console.log('Right arrow pressed');
      break;
    case 'ArrowLeft':
      // Custom behavior for left arrow
      console.log('Left arrow pressed');
      break;
  }
});
    static instance;
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();

        this.preloader.on("enablecontrols", () => {
            this.controls = new Controls();
        });

        this.sizes.on("resize", () => {
            this.resize();
        });
        this.time.on("update", () => {
            this.update();
        });
    }

    resize() {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }

    update() {
        this.preloader.update();
        this.camera.update();
        this.world.update();
        this.renderer.update();
        if (this.controls) {
            this.controls.update();
        }
    }
}
