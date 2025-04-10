import "./style.css";
import Experience from "./Experience/Experience.js";
const experience = new Experience(document.querySelector(".experience-canvas"));
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

