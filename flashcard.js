// bmc: Written by Bon Crowder @MathFour

var inquirer = require('inquirer');
var fs = require("fs");
var flashcardJsonFile = "flashcards.json";

Flashcard.prototype.save = function () {
    thisString = JSON.stringify(this);

    fs.readFile(flashcardJsonFile, "utf8", function (error, data) {
        if (data.indexOf("[") > -1) {
            newData = data.slice(0, -2);
            dataToSave = newData + ", \n" + thisString + "\n]";
            fs.writeFile(flashcardJsonFile, dataToSave, function (error) {
                if (error) {
                    return console.log(error);
                }
                console.log("The flashcard has been saved!");
            });
        }
        else {
            console.log("Please include a valid *.json file in this directory per the README.md file at https://github.com/mathfour/flashcard-generator");
        }
    });
};

function Flashcard(type, front, back, blank) {
    this.type = type;
    this.front = front;
    this.back = back;
    this.blank = blank;
}

function createFlashcard() {
    inquirer.prompt(
            {
                type: "list",
                message: "What type of flashcard would you like to create?",
                name: "type",
                choices: ["Question & Answer", "Fill-in-the-Blank"]
            }
    ).then(function (answer) {
        if (answer.type === "Question & Answer") {
            getFrontAndBackqa();
        }
        else if (answer.type === "Fill-in-the-Blank") {
            getFrontAndBackcd();

        }
    });
}

function readFlashcard() {
    inquirer.prompt(
            {
                type: "list",
                message: "What type of flashcard would you like to view?",
                name: "type",
                choices: ["Question & Answer", "Fill-in-the-Blank"]
            }
    ).then(function (answer) {
        if (answer.type === "Question & Answer") {
            viewFlashcard("qa");
        }
        else if (answer.type === "Fill-in-the-Blank") {
            viewFlashcard("cloze");

        }
    });
}

function viewFlashcard(kind) {
    fs.readFile("flashcards.json", "utf8", function (error, data) {
        if (error) {
            throw error;
        }
        else {
            flashcardInfo = JSON.parse(data);
            printRandomFlashcard(flashcardInfo, kind);
        }
    });}

function getFrontAndBackqa() {
    inquirer.prompt([
        {
            type: "input",
            message: "What's on the front?",
            name: "front"
        },
        {
            type: "input",
            message: "What's on the back?",
            name: "back"
        }]
    ).then(function (answers) {
        var myFlashcard = new Flashcard("qa", answers.front, answers.back);
        myFlashcard.save();
    });
}

function getFrontAndBackcd() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the full statement?",
            name: "fullText"
        },
        {
            type: "input",
            message: "What part should be in the blank?",
            name: "clozeDeletion"
        }]
    ).then(function (answers) {
        if (answers.fullText.indexOf(answers.clozeDeletion) === -1) {
            console.log("you didn't put in a blank bit that makes sense.");
            getFrontAndBackcd();
        }
        else {
            front = answers.fullText.replace(answers.clozeDeletion, "__________");
            back = answers.fullText;
            blank = answers.clozeDeletion;
            var myFlashcard = new Flashcard("cloze", front, back, blank);
            myFlashcard.save();
        }
    })
}

// bmc: user starts here upon launch
function promptUserWhatToDo() {
    inquirer.prompt(
            {
                type: "list",
                message: "What would you like to do?",
                name: "createOrStudy",
                choices: ["Create a Flashcard", "Study from Flashcards"]
            }).then(function (answers) {

        if (answers.createOrStudy === "Create a Flashcard") {
            createFlashcard();
        }
        else if (answers.createOrStudy === "Study from Flashcards") {
            readFlashcard();
        }
    })
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printRandomFlashcard(flashcardInfo, kind) {
    rand = getRandomIntInclusive(1, flashcardInfo.length);
    if (flashcardInfo[rand].type === kind) {
        console.log("The front is:\n", flashcardInfo[rand].front);
        console.log("The back is:\n", flashcardInfo[rand].back);
    }
    else {
        printRandomFlashcard(flashcardInfo, kind);
    }
}

promptUserWhatToDo();