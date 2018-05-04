const fs = require("fs");
const assert = require("assert");
const generator = require("javascript-generator.js");
const mainFile = require("../../j4.js");
const parse = require("../../../syntax/parser");
const TEST_DIR = "./test/generator/";

describe("The generator", () => {
    fs.readdirSync(TEST_DIR).forEach((name) => {
        if (name.endsWith(".j4")) {
            it(`verifies that the expected output of ${name}.j4 equals the actual ouput ${name}.`, (done) => {
                // We always wrap Ohm failures in an error with text "Syntax Error"
                const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
                program.analyze();
                let expectedOutput = eval(program.gen());
                assert.deepEqual(expectedOutput, );
                // assert.deepEqual();
                // assert.throws(() => program.analyze(), errorPattern);
                // fs.readFile(`${__dirname}/${name}.json`, "utf-8", (_err, expected) => {
                //     assert.deepEqual(ast, JSON.parse(expected));
                //     done();
                // });
                done();
            });
        }
    });
});
