// bmc: todo print the code and figure out what's going on
// bmc: todo map out the details on what I have and what I still need
var inquirer = require('inquirer');
var fs = require("fs");

inquirer.prompt(
    {
        type: "list",
        message: "Do you want to create flashcards or study?",
        name: "createOrStudy",
        choices: ["Create a Flashcard", "Study from Flashcards"]
    }).then(function (answers) {

    if (answers.createOrStudy === "Create a Flashcard") {
        action = "create";
        console.log("You're creating a flashcard");
        // bmc: launch the function to prompt for type of flashcard
        getCardType(handleTheCard, action);
    }
    else if (answers.createOrStudy === "Study from Flashcards") {
        action = "read";
        console.log("You're viewing a flashcard");
        // bmc: launch the function to view a random flashcard (or ask which kind they want)
        getCardType(handleTheCard, action);
    }
});

function Flashcard(front, back, type){
    this.front = front;
    this.back = back;
    this.type = type;
    this.showFront = function (front) {
        console.log("------------------------------------------");
        console.log("|                                        |");
        console.log("|                                        |");
        console.log("|                                        |");
        console.log(""
        console.log("|                                        |");
        console.log("|                                        |");
        console.log("|                                        |");
        console.log("------------------------------------------");
    }
}

Flashcard.prototype.showFront = function () {

    console.log(this.front);
};

// BasicFlashcard.prototype.showQandA = function () {
//     console.log(this.question + " " + this.answer);
// };
//
// BasicFlashcard.prototype.showQuestion = function () {
//     console.log(this.question);
// }
//
// BasicFlashcard.prototype.showAnswer = function () {
//     console.log(this.answer);
// }

BasicFlashcard.prototype.saveQandA = function () {
 fs.appendFile("basic-cards.txt", this.question + " " + this.answer, function(err) {
  if (err) {
    console.log(err);
  }
  else {
      var flashcard = new Flashcard()
    console.log("Your flashcard has been saved!");
  }
});
};
//
// ClozeFlashcard.prototype.showPartialText = function () {
//     // bmc: find the deletion in the statement and suck it out
// };
//
// ClozeFlashcard.prototype.showClozeDeletion = function () {
//     console.log(this.deletion);
// }
//
// ClozeFlashcard.prototype.showFullText = function () {
//     console.log(this.statement);
// }

ClozeFlashcard.prototype.saveFullText = function () {
   fs.appendFile("cloze-cards.txt", this.statement, function (err) {
      if (err) {
          console.log(err);
      }
      else {
          console.log("Your flashcard has been saved!");
      }
   })
}

function getCardType(handleTheCard) {
    inquirer.prompt({
        type: "list",
        message: "Q & A cards or Fill-in-the-blank?",
        name: "cardType",
        choices: ["Q & A", "Fill-in-the-blank"]
    }).then(function (answers) {
        if (answers.cardType === "Q & A") {
            console.log("you picked QA");
            cardType = "questionAnswer";
            questionAnswer(action);
        }
        else if (answers.cardType === "Fill-in-the-blank") {
            console.log("you picked cloze");
            cardType = "clozeDeleted";
            clozeDeleted(action);
        }
        console.log(cardType);
    });
    handleTheCard(action, cardType);
}

function handleTheCard(action, cardType) {
   if (action === "read"){
       // bmc: read the card
       console.log("you want to read the", cardType, "card.");
   }
   else if (action === "create") {
       // bmc: create the card
       console.log("you want to create the", cardType, "card.");
   }
}
