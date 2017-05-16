
var fs = require("fs");

function BasicFlashcard(){
    this.question = question;
    this.answer = answer;
}

function ClozeFlashcard() {
    this.statement = statement;
    this.deletion = deletion;
}

BasicFlashcard.prototype.showQandA = function () {
    console.log(this.question + " " + this.answer);
};

ClozeFlashcard.prototype.showPartialText = function () {
    // bmc: find the deletion in the statement and suck it out
};

BasicFlashcard.prototype.saveQandA = function () {
 fs.appendFile("basic-cards.txt", this.question + " " + this.answer, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Your flashcard has been saved!");
  }
});
};

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
