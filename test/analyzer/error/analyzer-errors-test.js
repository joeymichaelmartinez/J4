/*
 * Semantic Analysis Errors Tests
 *
 * Tests that the semantic analysis phase detects errors in poorly written J4
 * programs.
 */

const fs = require("fs");
const assert = require("assert");
const parse = require("../../../syntax/parser");

describe("The semantic analyzer", () => {
    fs.readdirSync(__dirname).forEach((name) => {
        if (name.endsWith(".error")) {
            it(`detects a ${name.replace(/[^a-z]/g, " ")}`, (done) => {
                const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
                const errorPattern = RegExp(name.replace(".error", "").replace(/-/g, " "), "i");
                assert.throws(() => program.analyze(), errorPattern);
                done();
            });
        }
    });
});
