import Page from "classes/Page";

class MainPage extends Page {
  constructor() {
    super({
      id: "main-page",
      element: ".main-page",
      elements: { wrapper: ".main-page__content" },
    });
  }

  create() {
    super.create();
  }
}

export default MainPage;
