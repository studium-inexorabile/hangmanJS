const inquirer = require('inquirer')
const chalk = require('chalk')

const success = chalk.bold.green
const failure = chalk.bold.red
const successName = chalk.bold.underline.green
const failureName = chalk.bold.underline.red
const warning = chalk.bold.yellow
const warningName = chalk.bold.underline.yellow
const blue = chalk.bold.blue
 
const main = async () => {
    console.clear()
    let status = false
    let letter = ""
    const words = ['absurd', 'awkward', 'bagpipes', 'banjo', 'abrupt', 'bikini', 'crypt', 'buffalo', 'cycle', 'equip', 'fixable', 'gossip', 'gnarly', 'injury', 'jinx', 'pixel', 'puppy', 'quiz', 'subway', 'swivel', 'vortex', 'wavy', 'waltz', 'wizard', 'youthful', 'zipper', 'zombie']
    let shownWord = []
    let chosenWord = words[Math.floor(Math.random() * words.length)].split('')
    let wrongTurns = 6
    let usedLetters = []

    for(let i = 0; i < chosenWord.length; i++){
        shownWord.push('_')
    }

    do{
        console.log(shownWord.join(" "))
        console.log(failure(wrongTurns) + " wrong turns left")
        console.log()
        letter = await inquirer.prompt({
            type: 'input',
            name: 'letter',
            message: 'Choose a letter'
        })
        if(letter.letter.length > 1){
            console.log(failure("Only one letter can be submitted at a time"))
        }else if(chosenWord.indexOf(letter.letter) < 0 && usedLetters.indexOf(letter.letter) < 0){
            usedLetters.push(letter.letter)
            wrongTurns--
            console.clear()
            console.log(failure("There are no " + warning(letter.letter) + "'s"))
        }else if(usedLetters.indexOf(letter.letter) >= 0){
            console.clear()
            console.log(warning(letter.letter) + blue(" has already been chosen"))
        }else{
            let number = 0
            usedLetters.push(letter.letter)
            for(let i = 0; i < chosenWord.length; i++){
                if(chosenWord[i] == letter.letter){
                    shownWord[i] = letter.letter
                    number++
                }
            }
            console.clear()
            if(number > 1){
                console.log(success("There are " + number + " ") + warning(letter.letter) + success("'s"))
            }else{
                console.log(success("There is " + number + " ") + warning(letter.letter))
            }
            
        }
        console.log("Chosen Letters - " + warningName(usedLetters))
        if(shownWord.join("") == chosenWord.join("")){
            status = true
            break
        }
    }while(wrongTurns > 0)

    if(status){
        console.clear()
        console.log(shownWord.join(""))
        console.log(successName("You Win!"))
    }else{
        console.clear()
        console.log(failureName("You Lose! ") + failure("The word was ") + warning(chosenWord.join("")))
    }
}
main()