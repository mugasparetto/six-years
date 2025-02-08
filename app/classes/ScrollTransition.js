import GSAP from "gsap";
import each from "lodash/each";

import Component from "./Component";

class ScrollTransition extends Component {
  constructor({ element, elements, setActiveTransitionSection }) {
    super({ element, elements });

    this.setActive = setActiveTransitionSection;

    this.height = this.element.offsetHeight;
    this.top = this.element.offsetTop;
    this.bottom = this.top + this.height;
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
      { threshold: 0.5 }
    );

    this.observer.observe(this.element);
  }

  onResize() {
    this.height = this.element.offsetHeight;
    this.top = this.element.offsetTop + this.threshold * this.height;
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
