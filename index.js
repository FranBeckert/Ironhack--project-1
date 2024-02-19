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
let audio = new Audio("sound-wav/c.wav");

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
  ["a", "a", "e", "e", "fsharp", "fsharp", "e"],
  ["d", "d", "csharp", "csharp", "b", "b", "a"],
  // with piano accompaniment
  ["a", "a", "e", "e", "fsharp", "fsharp", "e"],
  ["d", "d", "csharp", "csharp", "b", "b", "a"],
  ["a", "a", "e", "e", "fsharp", "fsharp", "e", "d", "d", "csharp", "csharp", "b", "b", "a"][
    // solo
    ("e", "e", "d", "d", "csharp", "csharp", "b", "e", "e", "d", "d", "csharp", "csharp", "b")
  ],
  // with piano accompaniment
  ["e", "e", "d", "d", "csharp", "csharp", "b", "e", "e", "d", "d", "csharp", "csharp", "b"],
  // whole music with piano
  [
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
  ][
    // whole music without piano melodie
    ("a",
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
    "a")
  ],
];

// to know the actual state we are
const state = {
  playedSequence: [],
  // to take the phases
  currentPhase: 0,
};

function render() {
  console.log("played sequence", state.playedSequence);
  const expectedSequence = phases[state.currentPhase];
  console.log("expected sequence", expectedSequence);
  console.log("state", state);
  if (state.playedSequence.length === expectedSequence.length) {
    let isEqual = true;
    state.playedSequence.forEach((note, index) => {
      if (note !== expectedSequence[index]) {
        isEqual = false;
      }
    });
    const instructions = document.getElementById("instructions");
    const continueButton = document.getElementById("continue-button");

    state.playedSequence = [];
    if (isEqual) {
      // change the display of the continue-button
      

      if (state.currentPhase < phases.length - 1) {
        instructions.innerText = "You nailed it!";
        continueButton.style.display ="block";
        state.currentPhase++;
      } else {
        instructions.innerText = "Game is finished. Well done violinist!";
      }
    } else {
      instructions.innerText = "Almost! Let's try one more time";
      continueButton.style.display ="none";

    }
  }

  // if ...length===6
  // if right {appear button /cheange text}
  // else wrong {playedSequence: [], try again}
}

// continueButto.addeventlistener (click){
// esconder botao, mudar o texto, mudar a sequencia[]
// render()
// }
