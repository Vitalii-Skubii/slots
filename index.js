const screenWidth = window.screen.width;

const icon_height = screenWidth < 1280 ? 33.25 : 130;

const num_icons = 4;

const time_per_icon = 100;

const roll = (reel, offset = 0) => {
  const delta = offset;

  const style = getComputedStyle(reel);
  const backgroundPositionY = parseFloat(style['background-position-y']);
  const calculatedBackgroundPositionY =
    backgroundPositionY + delta * icon_height;

  reel.style.transition = `background-position-y ${
    8 + delta * time_per_icon
  }ms`;
  reel.style.backgroundPositionY = `${calculatedBackgroundPositionY}px`;
};

function rollAll() {
  const reel1 = document.querySelector('.reel1');
  const reel2 = document.querySelector('.reel2');
  const reel3 = document.querySelector('.reel3');
  const reel4 = document.querySelector('.reel4');
  const reel5 = document.querySelector('.reel5');

  roll(reel1, 8);
  roll(reel2, 11);
  roll(reel3, 13);
  roll(reel4, 15);
  roll(reel5, 18);
}

const openModal = function () {
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  location.reload(true);
};

let intervalId = null;

function runFunctionNTimes(func, times) {
  let count = 0;
  if (!intervalId) {
    func();
    count++;
    if (count === times) {
      clearInterval(intervalId);
      intervalId = null;
      setTimeout(() => {
        openModal();
        console.log(1);
      }, 5000);
    } else {
      intervalId = setInterval(() => {
        func();
        count++;
        if (count === times) {
          clearInterval(intervalId);
          intervalId = null;
          setTimeout(() => {
            openModal();
            console.log(1);
          }, 5000);
        }
      }, 3000);
    }
  }
}

const openModalBtn = document.querySelector('.button');
const closeModalBtn = document.querySelector('.button-modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

openModalBtn.addEventListener('click', () => {
  runFunctionNTimes(rollAll, 3);
});

closeModalBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);
