let allButtons = document.getElementsByClassName("note-buttons");
let allButtonsArray = [...allButtons];
console.log(allButtons);
console.log(allButtonsArray);

// ### change the button color when clicked
allButtonsArray.forEach((button) => {
  // console.log(button.dataset.note)
  button.addEventListener("click", () => {
    button.style.backgroundColor = "chocolate";
    setTimeout(() => {
      button.style.backgroundColor = "";
    }, 300);

    state.playedSequence.push(button.dataset.note);
    render();
  });
});

// ### put sound on the note-buttons
let audio = new Audio();

const notesSound = (note) => {
  audio.src = `sound-wav/${note}.wav`;
  console.log("note sounds", audio.src);
  audio.play();
};

allButtonsArray.forEach((button) => {
  button.addEventListener("click", () => {
    notesSound(button.dataset.note);
    console.log("daset", button.dataset.note);
  });
});

const phases = [
  // solo
  { sequence: ["a", "a", "e", "e", "fsharp", "fsharp", "e"], instructionPhase: "Listen and repeat", audioSequence: "sound-2/1.wav" },
  { sequence: ["d", "d", "csharp", "csharp", "b", "b", "a"], instructionPhase: "Listen and repeat", audioSequence: "sound-2/2.wav" },
  // with piano accompaniment
  {
    sequence: ["a", "a", "e", "e", "fsharp", "fsharp", "e", "d", "d", "csharp", "csharp", "b", "b", "a"],
    instructionPhase: "Now everything you just learned with piano accompaniment",
    audioSequence: "sound-2/34.wav",
  },
  //   play solo
  { sequence: ["e", "e", "d", "d", "csharp", "csharp", "b", "e", "e", "d", "d", "csharp", "csharp", "b"], instructionPhase: "Listen and repeat", audioSequence: "sound-2/6(1).wav" },
  // with piano accompaniment
  { sequence: ["e", "e", "d", "d", "csharp", "csharp", "b", "e", "e", "d", "d", "csharp", "csharp", "b"], instructionPhase: "Now with piano accompaniment", audioSequence: "sound-2/6.wav" },
  // whole music with piano
  {
    sequence: [
      "a",
      "a",
      "e",
      "e",
      "fsharp",
      "fsharp",
      "e",
      "d",
      "d",
      "csharp",
      "csharp",
      "b",
      "b",
      "a",
      "e",
      "e",
      "d",
      "d",
      "csharp",
      "csharp",
      "b",
      "e",
      "e",
      "d",
      "d",
      "csharp",
      "csharp",
      "b",
      "a",
      "a",
      "e",
      "e",
      "fsharp",
      "fsharp",
      "e",
      "d",
      "d",
      "csharp",
      "csharp",
      "b",
      "b",
      "a",
    ],
    instructionPhase: "Play the whole music with a remix",
    audioSequence: "sound-2/8.wav",
  },
];

// to know the actual state we are
const state = {
  playedSequence: [],
  // to take the phases
  currentPhase: 0,
  points: 5,
  gameFinished: false,
};

const instructions = document.getElementById("instructions");
const continueButton = document.getElementById("continue-button");
const section1 = document.getElementById("section-1");

// points
const gamePoints = document.getElementById("game-points");

continueButton.addEventListener("click", () => {
  if (state.gameFinished) {
    state.gameFinished = false;
    state.points = 5;
    state.currentPhase = 0;
    state.playedSequence = [];
    gamePoints.style.display = "block";
    musicNotesDisplayed.style.display = "block";
    section1.style.backgroundColor = "khaki";
    console.log("total points second time:", state.points);
    gamePoints.innerHTML = `Points: ${state.points}`;
    instructions.innerHTML = "Click on Start Game:";
  }
  render();
});

function checkPoints() {
  if (state.points === 0) {
    state.gameFinished = true;
    instructions.innerHTML = "GAME OVER";
    continueButton.innerText = "Start Game ";
    continueButton.style.display = "block";
    section1.style.backgroundColor = "orange";
    gamePoints.style.display = "none";
    refreshButton.style.display = "none";
  }
}

function render() {
  console.log("played sequence", state.playedSequence);
  const phase = phases[state.currentPhase];
  const expectedSequence = phase.sequence;
  console.log("expected sequence", expectedSequence);
  console.log("state", state);
  if (state.playedSequence.length === expectedSequence.length) {
    let isEqual = true;
    state.playedSequence.forEach((note, index) => {
      if (note !== expectedSequence[index]) {
        isEqual = false;
        continueButton.style.display = "block";
      }
    });

    state.playedSequence = [];
    if (isEqual) {
      // different phases customization
      section1.removeChild(refreshButton);
      if (state.currentPhase < phases.length - 1) {
        instructions.innerText = "You nailed it!";
        state.points++;
        console.log("total points:", state.points);
        continueButton.style.display = "block";
        continueButton.addEventListener("click", () => {
          continueButton.style.display = "none";
        });
        state.currentPhase++;
      } else {
        instructions.innerText = "Game is finished. Well done violinist!";
        state.gameFinished = true;
        instructions.innerHTML = "Congratulations! YOU WON!";
        section1.style.backgroundColor = "pink";
        continueButton.innerHTML = "Play again";
        gamePoints.style.display = "none";
        continueButton.style.display = "block";
        musicNotesDisplayed.style.display = "none";
      }
    } else {
      instructions.innerText = "Almost! Let's try one more time";
      continueButton.style.display = "none";
      console.log("creating button");
      state.points--;
      console.log("total points:", state.points);
    }
  }
  gamePoints.innerHTML = `Points: ${state.points}`;
  checkPoints();
}

// audio parts playing after clicking the button

let audio2 = new Audio();

const refreshButton = document.createElement("button");
refreshButton.innerText = "Clean sequence";
refreshButton.style.backgroundColor = "orange";
refreshButton.style.borderRadius = "4px";
refreshButton.style.marginTop = "4px";
refreshButton.style.marginBottom = "25px";
refreshButton.style.height = "2.5rem";
refreshButton.addEventListener("click", () => {
  state.playedSequence = [];
  render();
});

const initialText = document.getElementById("initial-text");
const musicNotesDisplayed = document.getElementById("music-notes-displayed");

continueButton.addEventListener("click", () => {
  continueButton.innerText = "Continue Game ";
  // clean the sequence if player started accidentally playing before hitting continue button
  state.playedSequence = [];
  // desappear the botton for the first time
  setTimeout(() => {
    continueButton.style.display = "none";
  }, 1);
  section1.append(refreshButton);

  initialText.style.display = "none";

  musicNotesDisplayed.style.display = "block";

  instructions.innerText = phases[state.currentPhase].instructionPhase;

  audio2.src = phases[state.currentPhase].audioSequence;
  audio2.play();

  render();
});
