class Detection {
  hasTouchSupport() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  isPhone() {
    return this.hasTouchSupport();
  }

  isDesktop() {
    return !this.hasTouchSupport();
  }
}

const DetectionManager = new Detection();

export default DetectionManager;
