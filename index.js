const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
let minNum = 1
let maxNum = 100
function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

// Original function for a random number
/*function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}*/

//Global variable to keep track of number of tries 
let count = 1;

// binary search function
function randomNum(min, max) {
    return Math.floor((min + max) / 2)
}


start();
async function start() {
    console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")

    let maxRange = await ask("First, let's determine your range! from 1 to ...? (Enter a number greater than 1)")

   // making sure the user enters an actual number.
    while (isNaN(maxRange)) {
        maxRange = await ask("That's not a valid response! Give me an actual number! (Enter a number greater than 1)")
    }

    let secretNumber = await ask(`And now... think of a number within 1 and ${maxRange}! What is your secret number?\nI won't peek, I promise...\n`);
    console.log('You entered: ' + secretNumber);

    // making sure the user enters an actual number.
    while (isNaN(secretNumber)) {
        secretNumber = await ask("That's not a valid response!Pick an actual number!")
    }
    
    //converting the input-string into a number
    let maxR = parseInt(maxRange)
    maxNum = maxR
    let randomNumber = randomNum(minNum, maxNum)
    let answer = await ask("Is this your number?\n" + randomNumber + " Yes(y) or No(n)")

    // making sure we are getting an actual response
    while (answer !== "y" && answer !== "n") {
        console.log('Please enter a valid response')
        answer = await ask("Yes(y) or No(n)")
    }
    //successful scenario - answer is yes
    if (answer.toLowerCase() === "y") {
        console.log(`Your number was ${randomNumber}! I guessed it!`)
        process.exit();
    }
    //unsuccessful scenario - answer is no
    while (answer.toLowerCase() === "n") {
        let highOrLow = await ask("Is it higher (H) or lower (L)?")
        while (highOrLow !== "h" && highOrLow !== "l") {
            console.log('Please enter a valid response')
            highOrLow = await ask("High(h) or Low(l)")
        }

        if (highOrLow.toLowerCase() === "h") {
            //making sure user is not cheating
            if (randomNumber === minNum) {
                console.log("Your secret number can't be any higher. You are cheating! Good bye!")
                process.exit()
            }
            minNum = randomNumber + 1
            randomNumber = randomNum(minNum, maxNum)
            answer = await ask("Is this your number?\n" + randomNumber + " Yes(y) or No(n)")
            while (answer !== "y" && answer !== "n") {
                console.log('Please enter a valid response')
                answer = await ask("Yes(y) or No(n)")
            }
        } else if (highOrLow.toLowerCase() === "l") {
            //making sure user is not cheating
            if (randomNumber === maxNum) {
                console.log("Your secret number can't be any lower. You are cheating! Good bye!")
                process.exit()
            }
            maxNum = randomNumber - 1
            randomNumber = randomNum(minNum, maxNum)
            answer = await ask("Is this your number?\n" + randomNumber + " Yes(y) or No(n)")
            while (answer !== "y" && answer !== "n") {
                console.log('Please enter a valid response')
                answer = await ask("Yes(y) or No(n)")
            }
        }
        //counting number of tries
        count += 1;
    }
    console.log(`Your number was ${randomNumber}! That was fun! Wasn't it?\nIt took me ${count} tries!\nBye, bye!`)
    process.exit()
}
