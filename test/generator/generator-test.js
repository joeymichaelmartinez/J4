const fs = require("fs");
const assert = require("assert");
const generator = require("javascript-generator.js");
const mainFile = require("../../j4.js");
const parse = require("../../../syntax/parser");
const TEST_DIR = "./test/generator/";

describe("The generator", () => {
    fs.readdirSync(TEST_DIR).forEach((name) => {
        if (name.endsWith(".error")) {
            it(`detects a syntax error in ${name}`, (done) => {
                fs.readFile(`${TEST_DIR}/${name}`, "utf-8", (err, input) => {
                    // We always wrap Ohm failures in an error with text "Syntax Error"

                    assert.throws(() => parse(input), /Syntax Error/);
                    done();
                });
            });
        }
    });
});
