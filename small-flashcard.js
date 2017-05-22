var inquirer = require('inquirer');
var fs = require("fs");
const readJSON = require('json-reader-writer');
const writeJson = require('json-reader-writer');
const filePath = 'flashcards.json';

writeJson(filePath, obj);

