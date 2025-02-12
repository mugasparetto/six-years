import GSAP from "gsap";
import NormalizeWheel from "normalize-wheel";
import each from "lodash/each";
import map from "lodash/map";
import Prefix from "prefix";

import Parallax from "animations/Parallax";
import ScrollTransition from "./ScrollTransition";

class Page {
  constructor({ element, elements, id }) {
    this.id = id;
    this.selector = element;
    this.selectorChildren = {
      ...elements,
      animationsParallaxes: '[data-animation="parallax"]',
      scrollTransitions: "[data-scroll-transition]",
    };

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
    };

    this.onMouseWheelEvent = this.onMouseWheel.bind(this);

    this.transformPrefix = Prefix("transform");
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });

    // this.addEventListeners();
    this.createAnimations();
    this.createScrollTransitions();
  }

  createAnimations() {
    this.animations = [];

    this.animationsParallaxes = map(
      this.elements.animationsParallaxes,
      (element) => {
        return new Parallax({ element });
      }
    );

    this.animations.push(...this.animationsParallaxes);
  }

  createScrollTransitions() {
    this.scrollTransitions = map(this.elements.scrollTransitions, (element) => {
      return new ScrollTransition({
        element,
        setActiveTransitionSection: this.setActiveTransitionSection.bind(this),
      });
    });
  }

  onMouseWheel(event) {
    const { pixelY } = NormalizeWheel(event);

    this.scroll.target += pixelY;
  }

  onResize() {
    this.scroll.limit =
      this.elements.wrapper.offsetTop +
      this.elements.wrapper.clientHeight -
      window.innerHeight;

    each(this.animations, (animation) => animation.onResize());
    each(this.scrollTransitions, (transition) => transition.onResize());
  }

  setActiveTransitionSection(instance) {
    this.activeTransitionSection = instance;
  }

  update() {
    this.scroll.target = GSAP.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );

    this.scroll.current = GSAP.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.1
    );

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }

    if (this.elements.wrapper) {
      this.elements.wrapper.style[
        this.transformPrefix
      ] = `translateY(-${this.scroll.current}px)`;
    }

    if (this.activeTransitionSection) {
      this.activeTransitionSection.transition(this.scroll.current);
    }

    each(this.animations, (animation) => {
      animation.update && animation.update(this.scroll);
    });
  }

  addEventListeners() {
    window.addEventListener("wheel", this.onMouseWheelEvent);
  }
}

export default Page;
