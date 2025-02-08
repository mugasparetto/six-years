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
    this.splitHighlights();
    this.createInitialAnimation();
    this.createScrollAnimations();
  }

  splitHighlights() {
    each(this.elements.highlights, (element, index) => {
      new SplitType(element);
      element.style.opacity = 1;
    });
  }

  createInitialAnimation() {
    this.firstHighlightAnimation = GSAP.timeline();
    this.firstHighlightAnimation.pause();
    this.firstHighlightAnimation.fromTo(
      this.elements.highlights[0].querySelectorAll(".char"),
      {
        y: 50,
      },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.5,
        onReverseComplete: () => {
          this.animateText.reverse();
        },
      }
    );

    this.animateText = GSAP.timeline();
    this.animateText.pause();
    this.animateText.to(this.elements.backgroundText, {
      y: -30,
      autoAlpha: 0,
      duration: 0.35,
    });

    this.animateText.call(() => {
      this.firstHighlightAnimation.play();
    });
  }

  createScrollAnimations() {
    each(this.scrollTransitions, (section, index) => {
      const animation = GSAP.timeline();
      animation.pause();
      animation
        .to(
          document.body,
          {
            backgroundColor: section.element.dataset.transitionColor,
          },
          0
        )
        .to(
          this.elements.highlights[index].querySelectorAll(".char"),
          {
            y: -50,
            autoAlpha: 0,
            stagger: 0.05,
          },
          "<"
        )
        .fromTo(
          this.elements.highlights[index + 1].querySelectorAll(".char"),
          { y: 50 },
          { y: 0, autoAlpha: 1, stagger: 0.1, delay: 0.2 },
          "<"
        );

      section.animation = animation;
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
      this.firstHighlightAnimation.reverse();
    }
  }
}

export default MainPage;
