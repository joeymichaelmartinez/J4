#!/usr/bin/env node

/*
 * A J4 Compiler
 *
 * This is a command line application that compiles a J4 program from
 * a file. There are three options:
 *
 * ./j4.js -a <filename>
 *     writes out the AST and stops
 *
 * ./j4.js -i <filename>
 *     writes the decorated AST then stops
 *
 * ./j4.js <filename>
 *     compiles the J4 program to JavaScript, writing the generated
 *     JavaScript code to standard output.
 *
 * ./j4.js -o <filename>
 *     optimizes the intermediate code before generating target JavaScript.
 *
 * NOTE FOR WINDOWS USERS: node j4.js -i filename.js
 * This is an example of how you should run this on windows command prompt
 * NOTE you can pipe output directly into node to run directly
 *
 * Output of the AST and decorated AST uses the object inspection functionality
 * built into Node.js.
 */
const soundsDir = "./SoundClips";
const player = require("play-sound")({});

const { argv } = require("yargs")
    .usage("$0 [-a] [-o] [-i] filename")
    .boolean(["a", "o", "i"])
    .describe("a", "show abstract syntax tree after parsing then stop")
    .describe("o", "do optimizations")
    .describe("i", "generate and show the decorated abstract syntax tree then stop")
    .demand(1);

const fs = require("fs");
const util = require("util");
const parse = require("./syntax/parser");
require("./backend/javascript-generator");

fs.readFile(argv._[0], "utf-8", (err, text) => {
    if (err) {
        console.error(err);//eslint-disable-line no-console
        return;
    }
    let program = parse(text);
    if (argv.a) {
        console.log(util.inspect(program, { depth: null }));//eslint-disable-line no-console
        return;
    }
    program.analyze();
    if (argv.o) {
        //program = program.optimize();
        console.log("Optimization has not been implemented unfortunately.");//eslint-disable-line no-console
        return;
    }
    if (argv.i) {
        console.log(util.inspect(program, { depth: null }));//eslint-disable-line no-console
        return;
    }
    console.log(program.gen());//eslint-disable-line no-console
    playSound();
});

//Randomly chooses a sound file from sound clips directory and plays it
function playSound() {
    fs.readdir(soundsDir, (err, files) => {
        let whichFile = Math.floor(Math.random() * files.length);
        let soundFile = soundsDir + "/" + files[whichFile];
        player.play(soundFile);
    });
}
