/*
 * Semantic Analysis Tests
 *
 * Tests that the semantic analysis phase decorates the AST as expected for
 * semantically correct programs, and enforces static semantic rules by
 * throwing the expected errors.
 */

const fs = require("fs");
const parse = require("../../../syntax/parser");

describe("The semantic analyzer", () => {
    fs.readdirSync(__dirname).forEach((name) => {
        if (name.endsWith(".j4")) {
            it(`should analyze ${name} without errors`, (done) => {
                // For now, we are happy to know that these files pass semantic analysis.
                // We eventually need to check that the ASTs are properly decorated.
                const program = parse(fs.readFileSync(`${__dirname}/${name}`, "utf-8"));
                program.analyze();
                done();
            });
        }
    });
});
