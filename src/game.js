class Game {
  constructor() {
    this.mainVictim = null;
    this.stepSize = 100;
    this.windowWidth = 0;
    this.victimX = 0;
    this.score = 0;
    this.scoreElement = null;
    this.redFlagContainer = null;
    this.greenFlagContainer = null;
    this.flagSpeed = 5;

    // Initialize event listeners
    document.addEventListener('DOMContentLoaded', this.init.bind(this));
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  init() {
    this.mainVictim = document.querySelector('.main-victim');
    this.windowWidth = window.innerWidth;
    this.victimX = (this.windowWidth - this.mainVictim.clientWidth) / 2;
    this.scoreElement = document.getElementById('score');
    this.redFlagContainer = document.querySelector('.red-flags');
    this.greenFlagContainer = document.querySelector('.green-flags');

    this.updateMainVictimPosition();
    this.updateScore();
    this.createRandomFlags();
  }

  updateMainVictimPosition() {
    this.mainVictim.style.left = this.victimX + 'px';
  }

  updateScore() {
    this.scoreElement.textContent = this.score;
    if(this.score < 0) {
      document.getElementById("game-screen").style.display = "none"
      document.getElementById("end-screen").style.display = "block";
    }
  }

  createFlag(container, type) {
    const flag = document.createElement('div');
    flag.classList.add(`${type}-flag`, 'flag');
    const randomX = Math.floor(Math.random() * (this.windowWidth - 50));
    flag.style.left = `${randomX}px`;
    flag.style.top = '0';
    container.appendChild(flag);
    this.moveFlag(flag, type);
  }

  moveFlag(flag, type) {
    const flagInterval = setInterval(() => {
      const flagY = parseInt(flag.style.top);
      const flagX = parseInt(flag.style.left);

      const victimRect = this.mainVictim.getBoundingClientRect();
      const flagRect = flag.getBoundingClientRect();

      if (
        victimRect.right > flagRect.left &&
        victimRect.left < flagRect.right &&
        victimRect.bottom > flagRect.top &&
        victimRect.top < flagRect.bottom
      ) {
        if (type === 'red') {
          this.score -= 10;
        } else {
          this.score += 10;
        }
        this.updateScore();
        flag.remove();
        clearInterval(flagInterval);
      }

      flag.style.top = flagY + this.flagSpeed + 'px';

      if (flagY >= window.innerHeight) {
        flag.remove();
        clearInterval(flagInterval);
      }
    }, 10);
  }

  handleKeyDown(event) {
    if (event.key === "ArrowLeft" && this.victimX > 0) {
      this.victimX -= this.stepSize;
    } else if (event.key === "ArrowRight" && this.victimX < this.windowWidth - this.mainVictim.clientWidth) {
      this.victimX += this.stepSize;
    }
    this.updateMainVictimPosition();
  }

  createRandomFlags() {
    const randomTime = Math.floor(Math.random() * 1000) + 1000;
    setTimeout(() => {
      if (Math.random() < 0.5) {
        this.createFlag(this.redFlagContainer, 'red');
      } else {
        this.createFlag(this.greenFlagContainer, 'green');
      }
      this.createRandomFlags();
    }, randomTime);
  }

}

const game = new Game();