import Prefix from "prefix";
import GSAP from "gsap";

import { BREAKPOINT_TABLET } from "utils/breakpoints";

export default class {
  constructor({ element }) {
    this.transform = Prefix("transform");

    this.element = element;
    this.media = element.querySelector("img");
    this.media.onload = (_) => {
      this.onResize();
    };

    this.parallax = {
      current: -this.amount,
      target: -this.amount,
    };

    this.scale = {
      current: 1.15,
      target: 1.15,
    };

    this.onResize();
  }

  onResize() {
    this.amount = window.innerWidth < BREAKPOINT_TABLET ? 10 : 45;

    const box = this.element.getBoundingClientRect();
    this.offset = { top: box.top, height: box.height };
  }

  update(scroll) {
    if (!this.offset) {
      return;
    }

    const { innerHeight } = window;

    const offsetBottom = scroll.current + innerHeight;

    if (offsetBottom >= this.offset.top) {
      this.parallax = GSAP.utils.clamp(
        -this.amount,
        this.amount,
        GSAP.utils.mapRange(
          -this.offset.height,
          innerHeight,
          this.amount,
          -this.amount,
          this.offset.top - scroll.current
        )
      );
      this.scale = GSAP.utils.clamp(
        1,
        1.15,
        GSAP.utils.mapRange(
          -this.offset.height,
          innerHeight,
          1,
          1.15,
          this.offset.top - scroll.current
        )
      );

      this.media.style[
        this.transform
      ] = `translate3d(0, ${this.parallax}px, 0) scale(${this.scale})`;
    } else {
      this.media.style[
        this.transform
      ] = `translate3d(0, -${this.amount}px, 0) scale(1.15)`;
    }
  }
}
