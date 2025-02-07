import Page from "classes/Page";

class MainPage extends Page {
  constructor() {
    super({
      id: "main-page",
      element: ".main-page",
      elements: { wrapper: ".main-page__content" },
    });

    this.isShowingYears = false;
  }

  create() {
    super.create();
  }

  update() {
    super.update();

    if (this.scroll.current > 0 && !this.isShowingYears) {
      console.log("animate out title");
      this.isShowingYears = true;
    }

    if (this.scroll.current <= 0 && this.isShowingYears) {
      console.log("animate in title");
      this.isShowingYears = false;
    }
  }
}

export default MainPage;
