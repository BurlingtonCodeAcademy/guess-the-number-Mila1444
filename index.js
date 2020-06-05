const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
let minNum = 1
let maxNum = 100
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  // Wait for user to think of a number and ask if random number is correct
  let randomNumber = randomNum(minNum, maxNum)
  let answer = await ask("Is this your number?\n" + randomNumber + " Yes(y) or No(n)")

  if (answer.toLowerCase() === "y") {
    console.log(`Your number was ${randomNumber}! I guessed it!`)
    process.exit();
  } if (answer.toLowerCase() !== "n") {
    console.log("That's not an valid answer. Let's start over!")
    process.exit()
  }

  while (answer.toLowerCase() === "n") {
    let highOrLow = await ask("Is it higher (H) or lower (L)?") 
    // let highNum = randomNum(newMin, maxNum)
    // let lowNum = randomNum(minNum, newMax)
    if (highOrLow.toLowerCase() === "h") {
      minNum = randomNumber + 1
      randomNumber = randomNum(minNum, maxNum)
      answer = await ask("Is this your number?\n" + randomNumber + " Yes(y) or No(n)")
      console.log(answer)
    } else if (highOrLow.toLowerCase() === "l") {
      maxNum = randomNumber - 1
      randomNumber = randomNum(minNum, maxNum)
      answer = await ask("Is this your number?\n" + randomNumber + " Yes(y) or No(n)")
    } else {
      console.log("That's not an valid answer. Let's start over!")
      process.exit()
    }
  }
  console.log(`Your number was ${randomNumber}! I guessed it in X tries! Bye now!`) // try to define X
    process.exit()
}

