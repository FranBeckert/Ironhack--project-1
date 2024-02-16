let allButtons = document.getElementsByClassName('buttons');
let allButtonsArray = [...allButtons]
console.log(allButtons)
console.log(allButtonsArray)

// let audio = new Audio("sound/a#.m4a");

// const notesSound = (note) => {
//     audio.src = `sound/${note}.m4a;`
//     audio.play();
// }

allButtonsArray.forEach(button => {
    // console.log(button.dataset.note)
    button.addEventListener('click', () => {
        // playTune(button.dataset.note);
        
        button.style.backgroundColor = 'chocolate';
        setTimeout(() => {
            button.style.backgroundColor= "";
        },300);
    });
    
});


// // implement the alerts
// let text = ""
// let playerName = prompt("Hi player! What is your name?");
// if (playerName === null || playerName = "") {
//     text = `Hello player 1`  
// } else {
//     text = `Hello ${playerName}!`
// }
// alert(text)

