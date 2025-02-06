import MainPage from "pages/MainPage";

class App {
  constructor() {
    this.createPage();
    this.addEventListeners();
    this.update();
  }

  createPage() {
    this.page = new MainPage();
    this.page.create();
    this.page.onResize();
  }

  onResize() {
    this.page.onResize();
  }

  addEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  update() {
    this.page.update();

    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }
}

new App();
