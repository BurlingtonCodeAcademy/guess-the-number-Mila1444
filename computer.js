const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
let minNum = 1
let maxNum = 100
function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

function randomComNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Global variable to keep track of number of tries
let count = 1;

start();
async function start() {
    console.log("Let's play a game where I (computer) make up a number and you (human) try to guess it.")

    let maxRange = await ask("First, you have to determine the range! from 1 to ...? (Enter a number greater than 1)")

    // making sure the user enters an actual number.
    while (isNaN(maxRange)) {
        maxRange = await ask("That's not a valid response! Give me an actual number! (Enter a number greater than 1)")
    }

    console.log(`And now... I will pick a number within 1 and ${maxRange}!`)
    //converting the input-string into a number  
    let maxR = parseInt(maxRange)
    maxNum = maxR
    let computerNum = randomComNum(minNum, maxNum)
    //console log to make sure the program is working
    //console.log(computerNum)

    let playerGuess = await ask("Can you guess what my secret number is?");
    console.log('You entered: ' + playerGuess);
    let plaGuess = parseInt(playerGuess)

    // making sure the user enters an actual number.
    while (isNaN(plaGuess)) {
        plaGuess = await ask("That's not a valid response! Enter an actual number!")
    }

    //successful scenario - answer is yes
    if (plaGuess === computerNum) {
        console.log(`You win! My secret number was ${computerNum}! You guessed it!`)
        process.exit();
    }

    //unsuccessful scenario - answer is no
    while (plaGuess !== computerNum) {
        console.log('This is not my number')

        if (plaGuess > computerNum) {
            console.log(`Your guess is too high. Try a number lower than ${plaGuess}`)
        } else if (plaGuess < computerNum) {
            console.log(`Your guess is too low. Try a number higher than ${plaGuess}`)
        }
        playerGuess = await ask("Can you guess what my secret number is?")
        plaGuess = parseInt(playerGuess)
        //counting number of tries
        count += 1;
    }
    console.log(`My number was ${computerNum}! That was fun! Wasn't it?\nIt took you ${count} tries!\nBye, bye!`)
    process.exit()
}





