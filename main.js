import "./style.css";
import Experience from "./Experience/Experience.js";

const experience = new Experience(document.querySelector(".experience-canvas"));
// scrollNavigation.js
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".page-section");
  let currentSection = 0;
  let isScrolling = false;

  const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length) return;
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: "smooth" });
    currentSection = index;
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  };

  const handleScroll = (event) => {
    if (isScrolling) return;

    if (event.deltaY > 0) {
      scrollToSection(currentSection + 1);
    } else if (event.deltaY < 0) {
      scrollToSection(currentSection - 1);
    }
  };

  const handleKeyDown = (event) => {
    if (isScrolling) return;

    if (event.key === "ArrowDown") {
      scrollToSection(currentSection + 1);
    } else if (event.key === "ArrowUp") {
      scrollToSection(currentSection - 1);
    }
  };

  window.addEventListener("wheel", handleScroll, { passive: false });
  window.addEventListener("keydown", handleKeyDown);
});
