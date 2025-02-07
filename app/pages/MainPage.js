import GSAP from "gsap";
import SplitType from "split-type";
import each from "lodash/each";

import Page from "classes/Page";

class MainPage extends Page {
  constructor() {
    super({
      id: "main-page",
      element: ".main-page",
      elements: {
        wrapper: ".main-page__content",
        backgroundText: ".main-page__background__text",
        highlights: ".main-page__background__highlight-wrapper h1",
      },
    });

    this.isShowingHighlight = false;
  }

  create() {
    super.create();
    this.createScrollAnimations();

    this.animateHighlights = [];
    each(this.elements.highlights, (element, index) => {
      new SplitType(element);
      element.style.opacity = 1;

      const animation = GSAP.timeline();
      animation.pause();

      if (index === 0) {
        animation.fromTo(
          element.querySelectorAll(".char"),
          {
            y: 50,
          },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.05,
            duration: 0.5,
            onReverseComplete: () => {
              this.animateText.reverse();
            },
          }
        );
      }

      this.animateHighlights.push(animation);
    });

    this.animateText = GSAP.timeline();
    this.animateText.pause();
    this.animateText.to(this.elements.backgroundText, {
      y: -30,
      autoAlpha: 0,
      duration: 0.35,
    });

    this.animateText.call(() => {
      this.animateHighlights[0].play();
    });
  }

  createScrollAnimations() {
    each(this.scrollTransitions, (section) => {
      const colorAnimation = GSAP.timeline();
      colorAnimation.pause();
      colorAnimation.to(document.body, {
        backgroundColor: section.element.dataset.transitionColor,
      });

      section.animations.push(colorAnimation);
    });
  }

  update() {
    super.update();

    if (this.scroll.current > 20 && !this.isShowingHighlight) {
      this.animateText.play();
      this.isShowingHighlight = true;
    }

    if (this.scroll.current <= 20 && this.isShowingHighlight) {
      this.isShowingHighlight = false;
      this.animateHighlights[0].reverse();
    }
  }
}

export default MainPage;
