let topZIndex = 1;

class PaperNote {
  constructor() {
    this.isDragging = false;
    this.touchX = 0;
    this.touchY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
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
    document.addEventListener('mousemove', (e) => {
      if (!this.isRotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        this.velocityX = this.mouseX - this.prevX;
        this.velocityY = this.mouseY - this.prevY;
      }

      const deltaX = e.clientX - this.touchX;
      const deltaY = e.clientY - this.touchY;
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
        this.prevX = this.mouseX;
        this.prevY = this.mouseY;

        noteElement.style.transform = `translate(${this.posX}px, ${this.posY}px) rotate(${this.angle}deg)`;
      }
    });

    noteElement.addEventListener('mousedown', (e) => {
      if (this.isDragging) return;
      this.isDragging = true;

      noteElement.style.zIndex = topZIndex;
      topZIndex += 1;

      if (e.button === 0) {
        this.touchX = this.mouseX;
        this.touchY = this.mouseY;
        this.prevX = this.mouseX;
        this.prevY = this.mouseY;
      }
      if (e.button === 2) {
        this.isRotating = true;
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.isRotating = false;
    });
  }
}

document.querySelectorAll('.note').forEach((noteElement) => {
  const note = new PaperNote();
  note.setup(noteElement);
});