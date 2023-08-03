#!/usr/bin/env node
"use strict";
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function runCli() {
    rl.question("Create file and functions: ", (input) => {
        const parsedInputs = parseInput(input);
        // TODO: fix to ask again
        if (!parsedInputs) {
            console.log("Invalid input. Write at least a filename and at least one function namme, each seperated with empty space.");
            runCli();
            return;
        }
        let { filename, functions } = parsedInputs;
        filename = validFileExtenstion(filename);
        const generatedFunctions = functionGenerator(functions);
        functions.forEach((funcName) => {
            fs.writeFileSync(filename, generatedFunctions.next().value, {
                flag: "a",
            });
            console.log(`Declared function ${funcName} in ${filename}.`);
        });
        rl.close();
    });
    function parseInput(input) {
        const pattern = /\b[a-zA-Z0-9.-_]+\b/g;
        const parsedStrings = input.match(pattern);
        if (!parsedStrings || parsedStrings.length <= 1)
            return null;
        const filename = parsedStrings[0];
        const functions = parsedStrings.slice(1);
        return { filename, functions };
    }
    function* functionGenerator(functions) {
        let index = 0;
        while (index < functions.length) {
            yield getFunctionString(functions[index]);
            index++;
        }
    }
    function getFunctionString(funcName) {
        return `function ${funcName}() {
    //TODO: Write function\n}\n\n`;
    }
    function validFileExtenstion(filename) {
        const validPattern = /\.(js|ts|tsx|jsx)$/;
        return validPattern.test(filename) ? filename : `${filename}.js`;
    }
}
runCli();
