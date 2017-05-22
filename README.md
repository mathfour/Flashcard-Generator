# Flashcard Study Center
Flashcard Generator - Homework 9

Submitted by Bon Crowder

### How to run the application: 

Install appropriate packages (info found in `package.json`) and save `flashcard.js` and `flashcards.json` to the same directory.
 Type `node flashcard.js` at the command line and press enter. You will be prompted to choose `Create a Flashcard` or `Study from Flashcards`.

#### If you Create a Flashcard 
  1. You'll be prompted with `What type of flashcard would you like to create?` 
  2. If you choose `Question & Answer`, you'll be asked to enter the front of the card (the question). Press `enter` when you've finished and you will be promted to enter the back (the answer).
  3. If you choose `Fill-in-the-Blank`, you'll be prompted for the full statement then the part that goes in the blank. Press enter after each.
        * For example, if your fill-in-the-blank statement is *Weird Al Yankovik was born in ______, California*, you would enter:
        
            ```? What is the full statement? Weird Al Yankovic was born in Lynwood, California.
            ? What part should be in the blank? Lynwood```

####  If you choose to Study from Flashcards
  1. You'll be prompted with `What type of flashcard would you like to view?` 
  2. If you choose `Question & Answer`, you'll be given a random front and back of a Question/Answer card.
  3. If you choose `Fill-in-the-Blank`, you'll be given a random front and back of a Fill-in-the-Blank card.
  
### Start from scratch

To create your own set of flashcards, start a blank `*.json` file with the following inside:
```
[
  {
    "type": "starter file"
  }
]
```

Note: there are **NO** spaces after the final square bracket.

In the `flashcard.js` file, change the name of the `flashcardJsonFile` variable on line 5 from `flashcards.json` to the name of your new `*.json` file. 

### What's next

You may have noticed that it's kinda lame to see **both** the question and the answer at the same time. The next step is to separate these so you can actually study.

Also, it'd be swell if the app didn't just stop after saving or showing a flashcard.


### Copyright and License

Like it? Use it and say where you got it. 

Have courage and be kind.
