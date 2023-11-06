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

  createRandomFlags() {
    const randomTime = Math.floor(Math.random() * 1000);
    const flagsObj = {
      red: [
        {
          img: "./images/barista.gif",
          text: "australian barista",
        },
        {
          img: "./images/dj.gif",
          text: "dj",
        },
        {
          img: "./images/manchild.gif",
          text: "manchild",
        },
        {
          img: "./images/peeing.gif",
          text: "peeing standing up",
        },
        {
          img: "./images/producer.gif",
          text: "creative producer",
        },
        {
          img: "./images/rude.gif",
          text: "rude",
        },
      ],
      green: [
        {
          img: "./images/honest.gif",
          text: "honest",
        },
        {
          img: "./images/funny.gif",
          text: "funny",
        },
        {
          img: "./images/respect.gif",
          text: "respectful",
        },
        {
          img: "./images/kind.gif",
          text: "kind",
        },
      ],
    }
    
    const randomGreenIndex = Math.floor(Math.random() * flagsObj.green.length)
    const randomGreen = flagsObj.green[randomGreenIndex]

    const randomRedIndex = Math.floor(Math.random() * flagsObj.red.length)
    const randomRed = flagsObj.red[randomRedIndex]


    setTimeout(() => {
      if (Math.random() < 0.7) {
        this.createFlag(this.redFlagContainer, 'red', randomRed.img, randomRed.text);
      } else {
        this.createFlag(this.greenFlagContainer, 'green', randomGreen.img, randomGreen.text);
      }
      this.createRandomFlags();
    }, randomTime);
  }

  createFlag(container, type, img, txt) {
    const flag = document.createElement('div');
    const image = document.createElement('img');
    image.style.width = "50px"
    image.src = img;
    const text = document.createTextNode(txt)
    flag.classList.add(`${type}-flag`, 'flag');
    const randomX = Math.floor(Math.random() * (this.windowWidth - 50));
    flag.style.left = `${randomX}px`;
    flag.style.top = '0';
    flag.appendChild(image);
    flag.appendChild(text);
    container.appendChild(flag);
    this.moveFlag(flag, type);
  }

  moveFlag(flag, type) {
    const flagInterval = setInterval(() => {
      ///this will be executed every 10 seconds
      const flagY = parseInt(flag.style.top);
      //returns information about the size and position of the element in the viewport.
      const victimRect = this.mainVictim.getBoundingClientRect();
      const flagRect = flag.getBoundingClientRect();

      //check if colliding
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

}

const game = new Game();