// CONSTANTS
let imageUrls = [
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afe02073d0bf8117885_workeffect-0.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afbdfc7f674050f31fa_workeffect-1.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afcb7cbf7f0e8c21d61_workeffect-2.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1b00e3744824fe7ef1d7_workeffect-3.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afda2f35987023a75a5_workeffect-4.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afb12d5ea372e9940fe_workeffect-5.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1affb145b0c70d66ce7a_workeffect-6.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1affabef3cc7d2e4909b_workeffect-7.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afc3ad55ca93ab05007_workeffect-8.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1affc1194a8f518033d4_workeffect-9.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1b0093fe36c4867c73be_workeffect-10.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1b2f2dae133de9674a7e_workeffect-11.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1b00f70e9217c4d82a03_workeffect-12.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afb13041a4d52079029_workeffect-13.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1b01b145b0c70d66cf8a_workeffect-14.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afdec4e0c0086eed62c_workeffect-15.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afb4e17d699dcca02b5_workeffect-16.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afdb66e9295d7c53486_workeffect-17.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1aff9028cf9d9bbf8d3f_workeffect-18.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1b01ebf3a2d6096634c1_workeffect-19.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1aff4ce80e2ff920fdc8_workeffect-20.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afd29e9786f498b6fdb_workeffect-21.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afca1109a155ed40660_workeffect-22.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1b0113041a4d52079cc7_workeffect-23.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afde96d13007725643d_workeffect-24.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1affe37fb0e312ca017d_workeffect-25.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afeccda4abd356a5a2d_workeffect-26.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afd3ad55ca93ab0506a_workeffect-27.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1b01d688b9145cb5f875_workeffect-28.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d239f69231395ac93efbb_workeffect-29.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1b2cd05cc5d58b3b95f4_workeffect-30.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afd761fab901b7ac542_workeffect-31.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afbb7cbf7f0e8c21caa_workeffect-32.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afb6e8f9feb166c0b3e_workeffect-33.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afb12d5ea372e9940e7_workeffect-34.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afbd1aa1afc155f0de5_workeffect-35.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afbd748d316e23e4802_workeffect-36.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afdb6f51b2a56fedfdc_workeffect-37.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afbe885ef17f251c24b_workeffect-38.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afdebf3a2d6096631bb_workeffect-39.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afb9e2b07f98cf1a839_workeffect-40.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afb93fe36c4867c7082_workeffect-41.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afb5d4896978df77ce0_workeffect-42.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1aff26ec1222eaae21b7_workeffect-43.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afb6d32687c48e89a6e_workeffect-44.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afe02073d0bf811788d_workeffect-45.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1aff6dc30614db4db2a4_workeffect-46.webp",
  "https://cdn.prod.website-files.com/6717c7af1514ac7192c1f7b6/673d1afe642c47495c3e9bab_workeffect-47.webp",
];

let distThreshold = 100;
let scaleFactor = 9.58;
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

function preload() {
  for (let i = 0; i < imageUrls.length; i++) {
    images[i] = loadImage(imageUrls[i]);
  }
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("canvas-parent");
  cnv.style("display", "block");
  cnv.style("position", "absolute");
  cnv.style("inset", "0");
  cnv.style("z-index", "-1");
  lastMousePos = { x: mouseX, y: mouseY };
}

function easeOutQuad(t) {
  return t * (2 - t);
}

function draw() {
  clear();
  background("#121212");

  currentTime = millis(); // Get the current time
  let d = dist(mouseX, mouseY, lastMousePos.x, lastMousePos.y);

  if (d > distThreshold) {
    if (queue.length >= maxImages) {
      queue[queue.length - 1].shouldFadeOut = true;
    }

    queue.unshift({
      currentPos: { x: lastMousePos.x, y: lastMousePos.y },
      targetPos: { x: mouseX, y: mouseY },
      index: imgIndex,
      opacity: 255,
      createdAt: currentTime,
      shouldFadeOut: false,
      isFadingOut: false,
      fadeStartTime: null,
    });

    lastMousePos = { x: mouseX, y: mouseY };
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

  let scale = width / scaleFactor;

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

      tint(255, imgData.opacity);
      image(
        img,
        imgData.currentPos.x - imgWidth / 2,
        imgData.currentPos.y - imgHeight / 2,
        imgWidth,
        imgHeight
      );
    }
  }

  noTint();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
