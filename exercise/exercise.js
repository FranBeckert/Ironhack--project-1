function anagramCounter(wordsArray) {
  let sortedArray = wordsArray.map((element) =>
    element.split("").sort().join("")
  );
  let counter = 0;
  for (let i = 0; i < sortedArray.length; i++) {
    if (sortedArray[i] === sortedArray[i+1]) {
      counter++;
            
  }
}
  return counter;
}

console.log(
  anagramCounter(["dell", "ledl", "abc", "cba", "bca", "bac"])
);
console.log(anagramCounter(['dell', 'ledl', 'abc', 'cba', 'bca', 'bac', 'cab']))


// function anagramCounter(wordsArray) {
//   for (let i=0; i<wordsArray.length;i++){
//     console.log(wordsArray[i]);
//   }  
// }

// console.log(anagramCounter(["dell", "ledl", "abc", "cba", "bca", "bac"]));
// // console.log(
// //   anagramCounter(["dell", "ledl", "abc", "cba", "bca", "bac", "cab"])
// // );