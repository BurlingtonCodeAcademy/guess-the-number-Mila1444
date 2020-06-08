const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
let minNum = 1
let maxNum = 100
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Original random function
// function randomNum(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

// binary search function
function randomNum(min, max) {
  return Math.floor((min + max) / 2)
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  //console.log('You entered: ' + secretNumber); (given with original code)
  // Wait for user to think of a number and ask if random number is correct
  let maxRange = await ask("But first, let's set your range! from 1 to ...? (Enter a number greater than 1)")
  // making sure the user enters an actual number
  if (isNaN(maxRange)) {
    maxRange = await ask("That's not a valid response! Give me an actual number! (Enter a number greater than 1)")
  }
  let maxR = parseInt(maxRange)
  maxNum = maxR
  let randomNumber = randomNum(minNum, maxNum)
  let answer = await ask("Is this your number?\n" + randomNumber + " Yes(y) or No(n)")

  if (answer.toLowerCase() === "y") {
    console.log(`Your number was ${randomNumber}! I guessed it!`)
    process.exit();
  } if (answer.toLowerCase() !== "n") {
    answer = await ask(`That's not an valid answer. Was ${randomNumber} your secret number? Yes(y) or No(n)`)
  }

  while (answer.toLowerCase() === "n") {
    let highOrLow = await ask("Is it higher (H) or lower (L)?")
    if (highOrLow.toLowerCase() === "h") {
      minNum = randomNumber + 1
      randomNumber = randomNum(minNum, maxNum)
      answer = await ask("Is this your number?\n" + randomNumber + " Yes(y) or No(n)")
      //making sure user is not cheating
      if (randomNumber === minNum) {
        console.log("Your secret number can't be any higher. You are cheating! Good bye!")
        process.exit()
      }
    } else if (highOrLow.toLowerCase() === "l") {
      maxNum = randomNumber - 1
      randomNumber = randomNum(minNum, maxNum)
      answer = await ask("Is this your number?\n" + randomNumber + " Yes(y) or No(n)")
      //making sure user is not cheating
      if (randomNumber === maxNum) {
        console.log("Your secret number can't be any lower. You are cheating! Good bye!")
        process.exit()
      }
      // in case the user enter something that's is not "h"/"l"
    } else if (answer.toLowerCase() !== "h" || "l") {
      console.log("That's not an valid answer. Let's start over!")
      process.exit()
    }
  }
  console.log(`Your number was ${randomNumber}! That was fun! Wasn't it? Bye, bye!`) // Ask about how I could get the actual number of tries
  process.exit()
}

