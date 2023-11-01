document.addEventListener('DOMContentLoaded', () => {
  const mainCharacter = document.querySelector('.main-character');
  const stepSize = 100;
  const windowWidth = window.innerWidth;
  const characterHeight = mainCharacter.clientHeight;

  let characterX = (windowWidth - mainCharacter.clientWidth) / 2; // Center the character horizontally

  // Function to update character position
  const updateMainCharacterPosition = () => {
    mainCharacter.style.left = characterX + 'px';
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

    // Move the flag towards the character
    moveFlag(flag, type);
  };

  // Function to move the flag towards the character
  const moveFlag = (flag, type) => {
    const flagSpeed = 5; 

    const flagInterval = setInterval(() => {
      const flagY = parseInt(flag.style.top);
      const flagX = parseInt(flag.style.left);

      // Calculate the bounding boxes for character and flag
      const characterRect = mainCharacter.getBoundingClientRect();
      const flagRect = flag.getBoundingClientRect();

      // Check for collision between character and flag
      if (
        characterRect.right > flagRect.left &&
        characterRect.left < flagRect.right &&
        characterRect.bottom > flagRect.top &&
        characterRect.top < flagRect.bottom
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

      // Move the flag vertically towards the character
      flag.style.top = flagY + flagSpeed + 'px';

      // Check if the flag is out of bounds and remove it
      if (flagY >= window.innerHeight) {
        flag.remove();
        clearInterval(flagInterval);
      }
    }, 10);
  };

  // Initial position and score update
  updateMainCharacterPosition();
  updateScore();

  // Add event listener for keydown event
  document.addEventListener('keydown', (event) => {
    if (event.key === "ArrowLeft" && characterX > 0) { 
      characterX -= stepSize;
    } else if (event.key === "ArrowRight" && characterX < windowWidth - mainCharacter.clientWidth) { 
      characterX += stepSize;
    } 
    updateMainCharacterPosition();
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
