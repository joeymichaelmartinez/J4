const fs = require("fs");
const assert = require("assert");
// const generator = require("../../backend/javascript-generator.js");
// const mainFile = require("../../j4.js");
const parse = require("../../syntax/parser");
const TEST_DIR = "./test/generator";
require("../../backend/javascript-generator");

describe("The generator", () => {
    fs.readdirSync(TEST_DIR).forEach((name) => {
        if (name.endsWith(".j4")) {
            it(`verifies that the expected output of ${name} equals the actual ouput which is in ${name}.js`, (done) => {
                const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
                program.analyze();
                let expectedOutput = eval(program.gen());
                let actualOutput = eval(fs.readFileSync(`${__dirname}/${name}.js`, "utf8"));
                assert.deepEqual(expectedOutput, actualOutput);
                done();
            });
        }
    });
});
