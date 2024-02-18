let allButtons = document.getElementsByClassName('buttons');
let allButtonsArray = [...allButtons]
console.log(allButtons)
console.log(allButtonsArray)


// // para saber qual é o estado atual
// const state = {
//     playedSequence: [],
//     expectedSequence:["a","a"...]
// }

// function render(){
//     console.log(state.playedSequence)
//     // if ...length===6
//         // if right {appear button /cheange text}
//         // else wrong {playedSequence: [], try again}
// }


let audio = new Audio("sound-wav/c.wav");

const notesSound = (note) => {
    audio.src = `sound-wav/${note}.wav`;
    console.log(audio.src)
    audio.play();
}

allButtonsArray.forEach(button => {
    // console.log(button.dataset.note)
    button.addEventListener('click', () => {
        notesSound(button.dataset.note);
        console.log(button.dataset.note)
        // state.playedSequence.push(button.dataset.note);
        
        button.style.backgroundColor = 'chocolate';
        setTimeout(() => {
            button.style.backgroundColor= "";
        },300);

        // render();
    });
    
});



// continueButto.addeventlistener (click){
    // esconder botao, mudar o texto, mudar a sequencia[]
    // render()
// }



