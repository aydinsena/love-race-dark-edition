document.addEventListener('DOMContentLoaded', () => {
  const mainVictim = document.querySelector('.main-victim');
  const stepSize = 100;
  const windowWidth = window.innerWidth;

  let victimX = (windowWidth - mainVictim.clientWidth) / 2; // Center the victim horizontally

  // Function to update victim position
  const updateMainVictimPosition = () => {
    mainVictim.style.left = victimX + 'px';
  };

  // Initialize the score
  let score = 0;
  const scoreElement = document.getElementById('score');

  // Function to update the score on the score board
  const updateScore = () => {
    scoreElement.textContent = score;
  };

  // Function to create a new flag and add it to the specified container
  const createFlag = (container, type) => {
    const flag = document.createElement('div');
    flag.classList.add(`${type}-flag`, 'flag');

    // Set a random position for the flag at the top of the screen
    const randomX = Math.floor(Math.random() * (windowWidth - 50));
    flag.style.left = `${randomX}px`;
    flag.style.top = '0';

    container.appendChild(flag);

    // Move the flag towards the victim
    moveFlag(flag, type);
  };

  // Function to move the flag towards the victim
  const moveFlag = (flag, type) => {
    const flagSpeed = 5; 

    const flagInterval = setInterval(() => {
      const flagY = parseInt(flag.style.top);
      const flagX = parseInt(flag.style.left);

      // Calculate the bounding boxes for victim and flag
      const victimRect = mainVictim.getBoundingClientRect();
      const flagRect = flag.getBoundingClientRect();

      // Check for collision between victim and flag
      if (
        victimRect.right > flagRect.left &&
        victimRect.left < flagRect.right &&
        victimRect.bottom > flagRect.top &&
        victimRect.top < flagRect.bottom
      ) {
        // Collision with a flag
        if (type === 'red') {
          score -= 10;
        } else {
          score += 10;
        }
        updateScore();
        flag.remove();
        clearInterval(flagInterval);
      }

      // Move the flag vertically towards the victim
      flag.style.top = flagY + flagSpeed + 'px';

      // Check if the flag is out of bounds and remove it
      if (flagY >= window.innerHeight) {
        flag.remove();
        clearInterval(flagInterval);
      }
    }, 10);
  };

  // Initial position and score update
  updateMainVictimPosition();
  updateScore();

  // Add event listener for keydown event
  document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowLeft" && victimX > 0) { 
      victimX -= stepSize;
    } else if (event.key === "ArrowRight" && victimX < windowWidth - mainVictim.clientWidth) { 
      victimX += stepSize;
    } 
    updateMainVictimPosition();
  });

  // Function to create flags at random intervals
  const createRandomFlags = () => {
    const randomTime = Math.floor(Math.random() * 1000) + 1000; 

    setTimeout(() => {
      if (Math.random() < 0.5) {
        createFlag(document.querySelector('.red-flags'), 'red');
      } else {
        createFlag(document.querySelector('.green-flags'), 'green');
      }

      createRandomFlags();
    }, randomTime);
  };

  // Call the initial flag creation function
  createRandomFlags();
});
