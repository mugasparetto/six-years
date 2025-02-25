import GSAP from "gsap";
import SplitType from "split-type";
import each from "lodash/each";
import p5 from "p5";

import Page from "classes/Page";
import Detection from "classes/Detection";
import Sketch from "sketches/hero";

class MainPage extends Page {
  constructor() {
    super({
      id: "main-page",
      element: ".main-page",
      elements: {
        wrapper: ".main-page__content",
        backgroundTextDiv: ".main-page__background__text",
        backgroundTexts: ".main-page__background__text h1",
        topText: ".main-page__background__top-text",
        bottomText: ".main-page__background__bottom-text",
        highlights: ".main-page__background__highlight-wrapper h1",
        lastSection: ".main-page__last-section",
      },
    });

    this.isShowingHighlight = false;
  }

  create() {
    super.create();
    this.splitHighlights();
    this.createIntroAnimation();
    this.createInitialAnimation();
    this.createScrollAnimations();

    if (Detection.isDesktop()) {
      new p5(Sketch, this.elements.lastSection);
    }
  }

  splitHighlights() {
    each(this.elements.highlights, (element, index) => {
      new SplitType(element);
      element.style.opacity = 1;
    });
  }

  createIntroAnimation() {
    this.firstTextAnimation = GSAP.timeline();
    this.firstTextAnimation
      .fromTo(
        this.elements.topText,
        { y: -50 },
        { y: 0, autoAlpha: 0.48, duration: 0.75, delay: 0.5 }
      )
      .fromTo(
        this.elements.bottomText,
        { y: 50 },
        { y: 0, autoAlpha: 0.48, duration: 0.75, delay: 0.5 },
        "<"
      )
      .fromTo(
        this.elements.backgroundTexts[0],
        {
          y: 50,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          delay: 0.2,
        }
      )
      .fromTo(
        this.elements.backgroundTexts[1],
        {
          y: 50,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          delay: 2.5,
        },
        ">"
      );

    this.firstTextAnimation.call(() => {
      this.shouldScroll = true;
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
    this.animateText.to(this.elements.backgroundTextDiv, {
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
          this.elements.highlights,
          {
            color: section.element.dataset.transitionColor,
          },
          0
        )
        // .to(
        //   this.elements.themeColor,
        //   {
        //     attr: { content: section.element.dataset.transitionColor },
        //   },
        //   "<"
        // )
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
