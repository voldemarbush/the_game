const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 600;
const staggerFrames = 3;
const frameArr = [7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 6, 6, 6, 6, 13, 13, 13, 13, 0];
const playerImage = new Image();

playerImage.src = 'Girl.png';

let step = 3;
let gameFrame = 0;
let action = 'stop';
class KeyControls {
  constructor(keysList) {
    this.keysList = keysList
    this.keys = {}

    addEventListener(`keydown`, e => this.changeState(e))
    addEventListener(`keyup`, e => this.changeState(e))

  }
  changeState(e) {
    if (!this.keysList.includes(e.code)) return
    this.keys[e.code] = e.type === 'keydown' ? true : false
  }
}
class Player {
  constructor() {
    this.x = 368;
    this.y = 268;
    this.Width = 64;
    this.Height = 64;
    this.frameX = 1;
    this.frameY = 20;
    this.standBy = true;
    this.keyboard = new KeyControls([`KeyA`, `KeyS`, `KeyD`, `KeyW`]);
    this.keys = this.keyboard.keys;
  }
  update() {
    if (this.keys.KeyA) { this.x -= step; this.frameY = 9; }
    if (this.keys.KeyD) { this.x += step; this.frameY = 11; }
    if (this.keys.KeyW) { this.y -= step; this.frameY = 8; }
    if (this.keys.KeyS) { this.y += step; this.frameY = 10; }
    if (!this.keys.KeyA && !this.keys.KeyD && !this.keys.KeyW && !this.keys.KeyS) {
      this.frameX = 0;
      this.standBy = true;
    } else {
      this.standBy = false;
    }
    if (this.x < -18) this.x = -18;
    if (this.y < -15) this.y = -15;
    if (this.x > 755) this.x = 755;
    if (this.y > 535) this.y = 535;
    if (gameFrame % staggerFrames == 0 && this.standBy == false) {
      if (this.frameX < frameArr[this.frameY] - 1) {
        this.frameX++;
      } else {
        this.frameX = 1;
      }
    }
    gameFrame++;
  }
  draw() {
    ctx.drawImage(playerImage, this.frameX * this.Width, this.frameY * this.Height, this.Width, this.Height, this.x, this.y, this.Width, this.Height);
  }
}
const player1 = new Player();
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  player1.update();
  player1.draw();
  requestAnimationFrame(animate);
}

animate();