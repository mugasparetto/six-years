import GSAP from "gsap";
import NormalizeWheel from "normalize-wheel";
import each from "lodash/each";
import map from "lodash/map";
import Prefix from "prefix";

import Parallax from "animations/Parallax";
import ScrollTransition from "./ScrollTransition";
import Detection from "./Detection";

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
      position: 0,
      target: 0,
      last: 0,
      limit: 0,
    };

    if (Detection.isPhone()) {
      this.onTouchStartEvent = this.onTouchStart.bind(this);
      this.onTouchMoveEvent = this.onTouchMove.bind(this);
      this.onTouchEndEvent = this.onTouchEnd.bind(this);
    }

    if (Detection.isDesktop()) {
      this.onMouseWheelEvent = this.onMouseWheel.bind(this);
    }

    this.transformPrefix = Prefix("transform");

    this.shouldScroll = false;
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

    this.addEventListeners();
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
    if (this.shouldScroll) {
      const { pixelY } = NormalizeWheel(event);

      this.scroll.target += pixelY;
    }
  }

  onTouchStart(event) {
    this.isDown = true;

    if (this.shouldScroll) {
      this.scroll.position = this.scroll.current;
      this.start = event.touches ? event.touches[0].clientY : event.clientY;
    }
  }

  onTouchMove(event) {
    if (this.shouldScroll) {
      const y = event.touches ? event.touches[0].clientY : event.clientY;
      const distance = (this.start - y) * 2;

      this.scroll.target = this.scroll.position + distance;
    }
  }

  onTouchEnd() {
    this.isDown = false;
  }

  onResize() {
    this.scroll.limit =
      this.elements.wrapper.offsetTop +
      this.elements.wrapper.clientHeight -
      window.innerHeight;

    each(this.animations, (animation) => animation.onResize());
    each(this.scrollTransitions, (transition) =>
      transition.onResize(this.scroll.current)
    );
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
      Detection.isPhone() ? 0.07 : 0.1
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
    if (Detection.isPhone()) {
      window.addEventListener("touchstart", this.onTouchStartEvent);
      window.addEventListener("touchmove", this.onTouchMoveEvent);
      window.addEventListener("touchend", this.onTouchEndEvent);
    }

    if (Detection.isDesktop()) {
      window.addEventListener("wheel", this.onMouseWheelEvent);
    }
  }
}

export default Page;
