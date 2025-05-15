import EventEmitter from "events";
import Experience from "../Experience.js";
import GSAP from "gsap";
import Convert from "../Utils/ConvertDivsToSpans.js";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;
    this.timeline = new GSAP.timeline();

    this.hasPlayedSecondIntro = false;
    this.hasReversedToFirstIntro = false;

    this.world.on("worldready", () => {
      this.setAssets();
      this.firstIntro();
    });
  }

  setAssets() {
    Convert(document.querySelector(".intro-text"));
    Convert(document.querySelector(".hero-main-title"));
    Convert(document.querySelector(".hero-main-description"));
    Convert(document.querySelector(".first-sub"));
    Convert(document.querySelector(".second-sub"));

    this.room = this.world.room.actualRoom;
    this.roomChildren = this.world.room.roomChildren;
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline.to(".preloader", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          document.querySelector(".preloader").classList.add("hidden");
        },
      });

      this.timeline
        .to(".intro-text .animatedis", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
        })
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 1,
            onComplete: resolve,
          },
          "-=0.2"
        );
    }).then(() => this.playIntro());
  }

  playIntro() {
    // Arrow key scroll interaction
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        if (!this.hasPlayedSecondIntro) {
          this.hasPlayedSecondIntro = true;
          this.hasReversedToFirstIntro = false;
          this.playSecondIntro();
        }
      } else if (e.key === "ArrowUp") {
        if (!this.hasReversedToFirstIntro) {
          this.hasReversedToFirstIntro = true;
          this.hasPlayedSecondIntro = false;
          this.reverseToFirstIntro();
        }
      }
    });

    // Mouse scroll interaction
    window.addEventListener("wheel", (e) => {
      if (e.deltaY > 0 && !this.hasPlayedSecondIntro) {
        this.hasPlayedSecondIntro = true;
        this.hasReversedToFirstIntro = false;
        this.playSecondIntro();
      } else if (e.deltaY < 0 && !this.hasReversedToFirstIntro) {
        this.hasReversedToFirstIntro = true;
        this.hasPlayedSecondIntro = false;
        this.reverseToFirstIntro();
      }
    });
  }

  playSecondIntro() {
    return new Promise((resolve) => {
      this.timeline
        .to(".intro-text .animatedis", {
          yPercent: 100,
          stagger: 0.05,
          ease: "back.in(1.7)",
        })
        .to(".arrow-svg-wrapper", {
          opacity: 0,
        }, "-=0.2")
        .to(".hero-main-title .animatedis", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
        })
        .to(".hero-main-description .animatedis", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
        }, "-=0.5")
        .to(".first-sub .animatedis", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
        }, "-=0.5")
        .to(".second-sub .animatedis", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
        }, "-=0.5")
        .add(() => {
          resolve();
        });
    });
  }

  reverseToFirstIntro() {
    return new Promise((resolve) => {
      this.timeline
        .to(".second-sub .animatedis", {
          yPercent: 100,
          stagger: 0.05,
          ease: "back.in(1.7)",
        })
        .to(".first-sub .animatedis", {
          yPercent: 100,
          stagger: 0.05,
          ease: "back.in(1.7)",
        }, "-=0.4")
        .to(".hero-main-description .animatedis", {
          yPercent: 100,
          stagger: 0.05,
          ease: "back.in(1.7)",
        }, "-=0.4")
        .to(".hero-main-title .animatedis", {
          yPercent: 100,
          stagger: 0.05,
          ease: "back.in(1.7)",
        }, "-=0.4")
        .to(".arrow-svg-wrapper", {
          opacity: 1,
        })
        .to(".intro-text .animatedis", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
        })
        .add(() => {
          resolve();
        });
    });
  }
}
