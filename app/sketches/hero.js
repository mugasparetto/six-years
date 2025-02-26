import i01 from "images/hero/01.webp";
import i02 from "images/hero/02.webp";
import i03 from "images/hero/03.webp";
import i04 from "images/hero/04.webp";
import i05 from "images/hero/05.webp";
import i06 from "images/hero/06.webp";
import i07 from "images/hero/07.webp";
import i08 from "images/hero/08.webp";

const sketch = (p) => {
  // CONSTANTS
  let imageUrls = [i01, i02, i03, i04, i05, i06, i07, i08];

  let distThreshold = 80;
  let scaleFactor = 14.58;
  let followSpeed = 0.1; // Adjust for smoothness
  let maxDisplayTime = 2000; // Maximum time (in milliseconds) an image remains visible
  let maxImages = 5; // Maximum number of images to display
  let fadeDuration = 500; // Duration of fade-out effect in milliseconds

  // VARIABLES
  let images = [];
  let queue = [];
  let lastMousePos = { x: 0, y: 0 };
  let imgIndex = 0;
  let currentTime = 0;

  p.preload = () => {
    for (let i = 0; i < imageUrls.length; i++) {
      images[i] = p.loadImage(imageUrls[i]);
    }
  };

  p.setup = () => {
    const section = document.querySelector(".main-page__last-section");
    p.createCanvas(section.offsetWidth, section.offsetHeight);
    lastMousePos = { x: p.mouseX, y: p.mouseY };
  };

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  p.draw = () => {
    p.background("#fafafa");

    currentTime = p.millis(); // Get the current time
    let d = p.dist(p.mouseX, p.mouseY, lastMousePos.x, lastMousePos.y);

    if (d > distThreshold) {
      if (queue.length >= maxImages) {
        queue[queue.length - 1].shouldFadeOut = true;
      }

      queue.unshift({
        currentPos: { x: lastMousePos.x, y: lastMousePos.y },
        targetPos: { x: p.mouseX, y: p.mouseY },
        index: imgIndex,
        opacity: 255,
        createdAt: currentTime,
        shouldFadeOut: false,
        isFadingOut: false,
        fadeStartTime: null,
      });

      lastMousePos = { x: p.mouseX, y: p.mouseY };
      imgIndex = (imgIndex + 1) % images.length;
    }

    queue = queue.filter((imgData) => {
      let timeSinceCreation = currentTime - imgData.createdAt;

      if (
        !imgData.isFadingOut &&
        (timeSinceCreation > maxDisplayTime ||
          imgData.shouldFadeOut ||
          queue.indexOf(imgData) >= maxImages)
      ) {
        imgData.isFadingOut = true;
        imgData.fadeStartTime = currentTime;
      }

      if (imgData.isFadingOut) {
        let fadeDurationSinceFadeStart = currentTime - imgData.fadeStartTime;

        if (fadeDurationSinceFadeStart < fadeDuration) {
          let progress = fadeDurationSinceFadeStart / fadeDuration;
          imgData.opacity = 255 * (1 - easeOutQuad(progress));
          return true;
        } else {
          return false;
        }
      }

      return true;
    });

    let scale = p.width / scaleFactor;

    for (let i = queue.length - 1; i >= 0; i--) {
      let imgData = queue[i];
      let img = images[imgData.index];
      if (img) {
        imgData.currentPos.x +=
          (imgData.targetPos.x - imgData.currentPos.x) * followSpeed;
        imgData.currentPos.y +=
          (imgData.targetPos.y - imgData.currentPos.y) * followSpeed;

        let imgWidth = (img.width * scale) / img.width;
        let imgHeight = (img.height * scale) / img.width;

        p.tint(255, imgData.opacity);
        p.image(
          img,
          imgData.currentPos.x - imgWidth / 2,
          imgData.currentPos.y - imgHeight / 2,
          imgWidth,
          imgHeight
        );
      }
    }

    p.noTint();
  };

  p.windowResized = () => {
    const section = document.querySelector(".main-page__last-section");
    p.resizeCanvas(section.offsetWidth, section.offsetHeight);
  };
};

export default sketch;
