/*
 * Parser Tests
 *
 * Tests that the parser produces the expected abstract syntax tree for a
 * variety of programs.
 */
const CAN_TEST = false;//Acts as a 'switch' to turn off parser testing

const fs = require("fs");
const assert = require("assert");
const parse = require("../../syntax/parser");

if (CAN_TEST) {
    describe("The parser", () => {
        fs.readdirSync(__dirname).forEach((name) => {
            if (name.endsWith(".j4")) {
                it(`produces the correct AST for ${name}`, (done) => {
                    fs.readFile(`${__dirname}/${name}`, "utf-8", (err, input) => {
                        const ast = parse(input);
                        fs.readFile(`${__dirname}/${name}.json`, "utf-8", (_err, expected) => {
                            assert.deepEqual(ast, JSON.parse(expected));
                            done();
                        });
                    });
                });
            }
        });
    });
}
