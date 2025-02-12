// Exporting a function called 'mySketch'
const sketch = (p) => {
  // Calling p5.js functions, using the variable 'p'
  p.setup = () => {
    // Creating a canvas using the entire screen of the webpage
    const section = document.querySelector(".main-page__last-section");
    p.createCanvas(section.offsetWidth, section.offsetHeight);
    p.background(0, 0, 255);
  };

  p.draw = () => {
    // Clear the frame
    p.background(0, 0, 255);

    // Draw an ellipse
    p.translate(p.width / 2, p.height / 2);
    p.ellipse(0, 0, 100 * p.sin(p.frameCount * 0.01), 100);
  };

  p.windowResized = () => {
    const section = document.querySelector(".main-page__last-section");
    p.resizeCanvas(section.offsetWidth, section.offsetHeight);
  };
};

export default sketch;
