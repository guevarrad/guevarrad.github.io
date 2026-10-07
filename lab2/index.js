// Select every button that has the "drum" class so we can attach one shared
// listener to all of them instead of writing 7 copies of the same code.
const buttons = document.querySelectorAll(".drum");

// This function is the heart of the app: it takes a key like "w" or "s",
// picks the matching drum sound, and plays it. Both click events and keyboard
// events use this same function.
function playDrumSound(letter) {
  let soundPath = "";

  switch (letter.toLowerCase()) {
    case "w":
      soundPath = "sounds/crash.mp3";
      break;
    case "a":
      soundPath = "sounds/kick-bass.mp3";
      break;
    case "s":
      soundPath = "sounds/snare.mp3";
      break;
    case "d":
      soundPath = "sounds/tom-1.mp3";
      break;
    case "j":
      soundPath = "sounds/tom-2.mp3";
      break;
    case "k":
      soundPath = "sounds/tom-3.mp3";
      break;
    case "l":
      soundPath = "sounds/tom-4.mp3";
      break;
    default:
      return;
  }

  const sound = new Audio(soundPath);
  sound.play();
  console.log("Playing key:", letter);
}

// Add a tiny animation so the button looks pressed when a sound is triggered.
function animateButton(letter) {
  const matchingButton = document.querySelector(`.${letter}`);

  if (!matchingButton) {
    return;
  }

  matchingButton.classList.add("pressed");
  setTimeout(function () {
    matchingButton.classList.remove("pressed");
  }, 100);
}

// Mouse click version: when a drum button is clicked, we read the exact element
// that was clicked and pass its text to the shared sound function.
buttons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const clickedButton = event.target;
    const key = clickedButton.innerHTML.toLowerCase();

    console.log("Clicked button:", event.target.innerHTML);
    playDrumSound(key);
    animateButton(key);
  });
});

// Keyboard version: pressing a key on the whole document triggers the same
// sound logic as clicking a button, but using event.key instead.
document.addEventListener("keydown", function (event) {
  const key = event.key.toLowerCase();
  const validKeys = ["w", "a", "s", "d", "j", "k", "l"];

  console.log("Keydown event:", event.key);

  if (validKeys.includes(key)) {
    playDrumSound(key);
    animateButton(key);
  }
});
