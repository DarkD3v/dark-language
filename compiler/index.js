const fs = require("fs");
let dictionary = require("./modules/dictionary.js").DICTIONARY;
let lexer = require("./modules/lexer/main_lexer.js").LEXER;
let parser = require("./modules/parser/main_parser.js").PARSER;
global.vars = [];
fs.readFile(JSON.parse(fs.readFileSync("./package.json")).main, "utf8", function (error, content) {

    if (error === null) {
        let lexems = lexer(content, dictionary);
        let parsedString = parser(lexems, dictionary);
        console.log(parsedString);
    } else {
        console.error("Error!");
        console.error(error);
    };

});
