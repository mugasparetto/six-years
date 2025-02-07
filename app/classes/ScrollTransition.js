import GSAP from "gsap";

import Component from "./Component";

class ScrollTransition extends Component {
  constructor({ element, elements, setActiveTransitionSection }) {
    super({ element, elements });

    this.setActive = setActiveTransitionSection;

    this.height = this.element.offsetHeight;
    this.top = this.element.offsetTop;
    this.bottom = this.top + this.height;

    this.createObserver();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("entrou");
          this.setActive(this);
        } else {
          console.log("saiu");
          this.setActive(null);
        }
      });
    });

    this.observer.observe(this.element);
  }

  onResize() {
    this.height = this.element.offsetHeight;
    this.top = this.element.offsetTop;
    this.bottom = this.top + this.height;
  }

  animate() {
    document.body.style.backgroundColor = GSAP.utils.interpolate(
      this.element.dataset.transitionColorFrom,
      this.element.dataset.transitionColorTo,
      this.progress
    );
  }

  transition(scrollAmount) {
    this.progress = GSAP.utils.clamp(
      0,
      1,
      GSAP.utils.mapRange(this.top, this.bottom, 0, 1, scrollAmount)
    );

    this.animate();
  }
}

export default ScrollTransition;
