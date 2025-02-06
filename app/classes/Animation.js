import Component from "./Component";

class Animation extends Component {
  constructor({ element, elements }) {
    super({ element, elements });

    this.createObserver();

    this.animateOut();
  }

  createObserver() {
    const options = {
      threshold: 0.75,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn();
        } else {
          this.animateOut();
        }
      });
    }, options);

    this.observer.observe(this.element);
  }

  animateIn() {}

  animateOut() {}

  onResize() {}
}

export default Animation;
