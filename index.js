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
  { sequence: ["a", "a", "e", "e", "fsharp", "fsharp", "e"], instructionPhase: "Listen and repeat", audioSequence: "sound-2/part1.wav" },
  { sequence: ["d", "d", "csharp", "csharp", "b", "b", "a"], instructionPhase: "Listen and repeat", audioSequence: "sound-2/part2.wav" },
  // with piano accompaniment
  { sequence: ["a", "a", "e", "e", "fsharp", "fsharp", "e"], instructionPhase: "Now with piano accompaniment", audioSequence: "sound-2/part3.wav" },
  { sequence: ["d", "d", "csharp", "csharp", "b", "b", "a"], instructionPhase: "Now with piano accompaniment" },
  { sequence: ["a", "a", "e", "e", "fsharp", "fsharp", "e", "d", "d", "csharp", "csharp", "b", "b", "a"], instructionPhase: "Now everything you just learned" },
  //   play solo
  { sequence: ["e", "e", "d", "d", "csharp", "csharp", "b", "e", "e", "d", "d", "csharp", "csharp", "b"], instructionPhase: "Listen and repeat" },
  // with piano accompaniment
  { sequence: ["e", "e", "d", "d", "csharp", "csharp", "b", "e", "e", "d", "d", "csharp", "csharp", "b"], instructionPhase: "Now with piano accompaniment" },
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
    instructionPhase: "Play the whole music",
  },
  // whole music without piano melodie
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
    instructionPhase: "Final step, whole music without the help of the piano melodie",
  },
];

// to know the actual state we are
const state = {
  playedSequence: [],
  // to take the phases
  currentPhase: 0,
  points: 5,
};

const instructions = document.getElementById("instructions");
const continueButton = document.getElementById("continue-button");
const section1 = document.getElementById("section-1");

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
      }
    });

    state.playedSequence = [];
    if (isEqual) {
      // different phases customization
      section1.removeChild(refreshButton);
      if (state.currentPhase < phases.length - 1) {
        instructions.innerText = "You nailed it!";
        continueButton.style.display = "block";
        state.currentPhase++;
      } else {
        instructions.innerText = "Game is finished. Well done violinist!";
      }
    } else {
      instructions.innerText = "Almost! Let's try one more time";
      continueButton.style.display = "none";
      // create a button to clean the sequence
      console.log("creating button");
    }
  }

  // if ...length===6
  // if right {appear button /cheange text}
  // else wrong {playedSequence: [], try again}
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

continueButton.addEventListener("click", () => {
  continueButton.innerText = "Continue Game ";

  section1.append(refreshButton);
  const initialText = document.getElementById("initial-text");
  initialText.style.display = "none";

  const musicNotesDisplayed = document.getElementById("music-notes-displayed");
  musicNotesDisplayed.style.display = "block";

  instructions.innerText = phases[state.currentPhase].instructionPhase;

  audio2.src = phases[state.currentPhase].audioSequence;
  audio2.play();

  render();
});

// phases.instructionPhase.forEach(instruction => {

// })

// continueButto.addeventlistener (click){
// esconder botao, mudar o texto, mudar a sequencia[]
// render()
// }
