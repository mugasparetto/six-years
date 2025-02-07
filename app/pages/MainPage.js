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
        backgroundText: ".main-page__background__text",
        highlights: "main-page__background__highlight-wrapper h1",
      },
    });

    this.isShowingHighlight = false;
  }

  create() {
    super.create();

    this.animateText = GSAP.timeline();
    this.animateText.pause();
    this.animateText.to(this.elements.backgroundText, {
      y: -30,
      autoAlpha: 0,
      duration: 0.35,
    });
  }

  update() {
    super.update();

    if (this.scroll.current > 20 && !this.isShowingHighlight) {
      console.log("animate out title");
      this.animateText.play();
      this.isShowingHighlight = true;
    }

    if (this.scroll.current <= 20 && this.isShowingHighlight) {
      console.log("animate in title");
      this.animateText.reverse();
      this.isShowingHighlight = false;
    }
  }
}

export default MainPage;
