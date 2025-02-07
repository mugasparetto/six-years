import GSAP from "gsap";
import SplitType from "split-type";

import Page from "classes/Page";

class MainPage extends Page {
  constructor() {
    super({
      id: "main-page",
      element: ".main-page",
      elements: {
        wrapper: ".main-page__content",
        activeHighlight: ".main-page__highlight__wrapper .active",
      },
    });

    this.isShowingYears = false;
  }

  create() {
    super.create();

    this.animateHighlight = GSAP.timeline();
    this.animateHighlight.pause();
    this.animateHighlight.to(this.elements.activeHighlight, {
      y: -30,
      autoAlpha: 0,
      duration: 0.35,
    });
  }

  update() {
    super.update();

    if (this.scroll.current > 20 && !this.isShowingYears) {
      console.log("animate out title");
      this.animateHighlight.play();
      this.isShowingYears = true;
    }

    if (this.scroll.current <= 20 && this.isShowingYears) {
      console.log("animate in title");
      this.animateHighlight.reverse();
      this.isShowingYears = false;
    }
  }
}

export default MainPage;
