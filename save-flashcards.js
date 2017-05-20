var inquirer = require('inquirer');
var fs = require("fs");


Flashcard.prototype.save = function () {
    console.log(this);
    thisString = JSON.stringify(this);
    fs.appendFile("flashcards.txt", thisString + "\n", function (error) {
        if (error) {
            console.log("there's an error: ", error);
        }
        else {
            console.log("success in saving");
        }
    })
};

function Flashcard(type, front, back) {
    this.type = type;
    this.front = front;
    this.back = back;
}

inquirer.prompt(
        {
            type: "list",
            message: "What type of flashcard would you like to create?",
            name: "type",
            choices: ["Question & Answer", "Fill-in-the-Blank"]
        }
).then(function (answer) {
    if (answer.type === "Question & Answer") {
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
    else if (answer.type === "Fill-in-the-Blank") {
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
            console.log("fullText is: ", answers.fullText);
            console.log("blank bit is: ", answers.clozeDeletion);
            console.log(answers.fullText.indexOf(answers.clozeDeletion));
            if (answers.fullText.indexOf(answers.clozeDeletion) === -1){
                console.log("you didn't put in a blank bit that makes sense.");
            }
            else {
                front = answers.fullText.replace(answers.clozeDeletion, "__________");
                back = answers. fullText;
                var myFlashcard = new Flashcard("cloze", front, back);

                myFlashcard.save();
            }

        })
    }
});