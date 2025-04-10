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
let scrollY = 0;
let scrollTarget = 0;
const scrollSpeed = 100; // pixels per arrow press

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    scrollTarget += scrollSpeed;
  } else if (e.key === 'ArrowUp') {
    scrollTarget -= scrollSpeed;
  }
});

// Optional: Clamp scrollTarget to prevent negative values
scrollTarget = Math.max(0, scrollTarget);

// Animate towards scrollTarget (smooth scroll effect)
function animateScroll() {
  scrollY += (scrollTarget - scrollY) * 0.1;

  // use scrollY value to drive your animations
  // e.g., camera movement, GSAP timeline, etc.

  requestAnimationFrame(animateScroll);
}

animateScroll();

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
