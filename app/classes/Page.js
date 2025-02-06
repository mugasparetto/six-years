import GSAP from "gsap";
import NormalizeWheel from "normalize-wheel";
import each from "lodash/each";
import Prefix from "prefix";

class Page {
  constructor({ element, elements, id }) {
    this.id = id;
    this.selector = element;
    this.selectorChildren = {
      ...elements,
      animationsHighlights: '[data-animation="highlight"]',
      animationsTitles: '[data-animation="title"]',
      animationsParagraphs: '[data-animation="paragraph"]',
      animationsLabels: '[data-animation="label"]',
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

    this.addEventListeners();
  }

  onMouseWheel(event) {
    const { pixelY } = NormalizeWheel(event);

    this.scroll.target += pixelY;
  }

  onResize() {
    console.log("resize");
    this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight;
    console.log(this.elements.wrapper.clientHeight);
    console.log(window.innerHeight);
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

    // console.log(this.scroll);
  }

  addEventListeners() {
    window.addEventListener("mousewheel", this.onMouseWheelEvent);
  }
}

export default Page;
