let topZIndexMobile = 1;

class PaperNoteMobile {
  constructor() {
    this.isDragging = false;
    this.touchX = 0;
    this.touchY = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.angle = Math.random() * 25 - 15;
    this.posX = 0;
    this.posY = 0;
    this.isRotating = false;
  }

  setup(noteElement) {
    document.addEventListener('touchmove', (e) => {
      if (!this.isRotating && e.touches.length === 1) {
        this.touchX = e.touches[0].clientX;
        this.touchY = e.touches[0].clientY;

        this.velocityX = this.touchX - this.prevX;
        this.velocityY = this.touchY - this.prevY;
      }

      const deltaX = this.touchX - this.prevX;
      const deltaY = this.touchY - this.prevY;
      const distance = Math.hypot(deltaX, deltaY);
      const normalizedX = deltaX / distance;
      const normalizedY = deltaY / distance;

      const rad = Math.atan2(normalizedY, normalizedX);
      let degrees = (rad * 180) / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;

      if (this.isRotating) {
        this.angle = degrees;
      }

      if (this.isDragging) {
        if (!this.isRotating) {
          this.posX += this.velocityX;
          this.posY += this.velocityY;
        }
        this.prevX = this.touchX;
        this.prevY = this.touchY;

        noteElement.style.transform = `translate(${this.posX}px, ${this.posY}px) rotate(${this.angle}deg)`;
      }
    });

    noteElement.addEventListener('touchstart', (e) => {
      if (this.isDragging) return;
      this.isDragging = true;

      noteElement.style.zIndex = topZIndexMobile;
      topZIndexMobile += 1;

      if (e.touches.length === 1) {
        this.prevX = e.touches[0].clientX;
        this.prevY = e.touches[0].clientY;
      }
      if (e.touches.length === 2) {
        this.isRotating = true;
      }
    });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
      this.isRotating = false;
    });
  }
}

// Initialize for mobile
document.querySelectorAll('.note').forEach((noteElement) => {
  const note = new PaperNoteMobile();
  note.setup(noteElement);
});
