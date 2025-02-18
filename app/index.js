import MainPage from "pages/MainPage";

class App {
  constructor() {
    this.createPage();
    this.addEventListeners();
    this.update();

    this.resizeObserver = new ResizeObserver(() => {
      this.onResize();
    });

    this.resizeObserver.observe(document.body);

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  createPage() {
    this.page = new MainPage();
    this.page.create();
    this.page.onResize();
  }

  onResize() {
    this.page.onResize();

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  addEventListeners() {}

  update() {
    this.page.update();

    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }
}

new App();
