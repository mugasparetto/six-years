import GSAP from "gsap";

import Animation from "../classes/Animation";

class Reveal extends Animation {
  constructor({ element, elements }) {
    super({ element, elements });

    this.element.style.opacity = "0";
    this.isVisible = false;
  }

  animateIn() {
    if (!this.isVisible) {
      this.revealAnimation = GSAP.timeline();
      this.revealAnimation.fromTo(
        this.element,
        { autoAlpha: 0, y: 50 },
        {
          duration: 1.5,
          autoAlpha: 1,
          y: 0,
          ease: "expo",
          overwrite: "auto",
        }
      );
    }

    this.isVisible = true;
  }

  animateOut() {}

  onResize() {}
}

export default Reveal;
