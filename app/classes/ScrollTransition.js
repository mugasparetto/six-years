import GSAP from "gsap";

import Component from "./Component";

class ScrollTransition extends Component {
  constructor({ element, elements, setActiveTransitionSection }) {
    super({ element, elements });

    this.setActive = setActiveTransitionSection;

    this.threshold = 0.5;

    this.createObserver();
  }

  createObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.setActive(this);
          } else {
            this.setActive(null);
          }
        });
      },
      { threshold: this.threshold }
    );

    this.observer.observe(this.element);
  }

  onResize() {
    const box = this.element.getBoundingClientRect();
    this.height = box.height;
    this.top = box.top;
    this.bottom = this.top + (1 - this.threshold) * this.height;
  }

  transition(scrollAmount) {
    this.progress = GSAP.utils.clamp(
      0,
      1,
      GSAP.utils.mapRange(this.top, this.bottom, 0, 1, scrollAmount)
    );

    this.animation.progress(this.progress);
  }
}

export default ScrollTransition;
