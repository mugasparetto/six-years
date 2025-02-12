// Exporting a function called 'mySketch'
const sketch = (p) => {
  // Calling p5.js functions, using the variable 'p'
  p.setup = () => {
    // Creating a canvas using the entire screen of the webpage
    const section = document.querySelector(".main-page__last-section");
    const canvas = p.createCanvas(section.offsetWidth, section.offsetHeight);
    p.background(0);
    p.noLoop();
  };

  p.draw = () => {
    // Clear the frame
    p.background(0, 50);

    // Draw an ellipse
    p.translate(p.width / 2, p.height / 2);
    p.ellipse(0, 0, 20, 20);
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };
};

export default sketch;
