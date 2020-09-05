let Type = require("./utils/type.js").TYPE;
let Eval = require("./utils/eval.js").EVAL;
let isEmpty = require("./utils/isEmpty.js").isEmpty;
let splitValue = require("./utils/splitValue.js").splitValue;

let DICTIONARY = {
    "function": {
        alert: function (fullValue) {
            let obj = splitValue(fullValue, DICTIONARY["type"]);
            if(!obj || obj === null || obj === undefined){
                return console.error("Object is undefined or object is null");
            };
            if(!obj.type || obj.type === null){
                return console.error("Type is not indicated");
            };
            let type = obj.type;
            let val = obj.val;

            let typeSymbol = "%";
            let parsedValue = Eval(val);

            if (Type(parsedValue) !== type) {
                console.error("Type error : " + typeof parsedValue + " !== " + type);
                return;
            }

            if (type === "char") typeSymbol += "c";
            else if (type === "string") typeSymbol += "s";
            else if (type === "int") typeSymbol += "d";
            else if (type === "float") typeSymbol += "f";
            else if (type === "undefined") typeSymbol += "s";
            else {
                console.error("UNKNOWN_TYPE: " + type);
                return;
            }

            return `printf("${typeSymbol}",${obj.varName && !isEmpty(obj.varName) ? obj.varName : parsedValue});\n`;
        },
        log: function (fullValue) {
            let obj = splitValue(fullValue, DICTIONARY["type"]);

            let type = obj.type;
            let val = obj.val;
            let parsedValue = Eval(val);
            if (Type(parsedValue) !== type) {
                console.error("Type error: " + typeof parsedValue + " !== " + type);
                return;
            }
            return `std::cout << ${parsedValue} << std::endl;`;
        },

        let: function (fullValue) {
            let obj = splitValue(fullValue, DICTIONARY["type"]);

            let type = obj.type;
            let val = obj.val;

            if (val.match(/\=/gm).length !== 1) {
                console.error("Unknown syntax: " + val);
                return;
            }
            else {
                let varName = val.split("=")[0].trim();
                let varValue = val.split("=")[1].trim();

                if (Type(varValue) !== type) {
                    console.error("Type error : " + typeof parsedValue + " !== " + type);
                    return;
                }
                else {
                    if (/[^a-zA-z0-9]/gm.test(varName)) {
                        console.error("There are unacceptable symbols in the variable name : " + varName);
                        return;
                    }
                    else {
                        if (/[0-9]/gm.test(varName[0])) {
                            console.error("The first letter of the variable should not be a number : " + varName);
                            return;
                        }
                        else {
                            global.vars.push({
                                type: type,
                                value: varValue,
                                varName: varName
                            });

                            if (Type(varValue) === "string") {
                                return `char ${varName}[] = ${varValue};\n`;
                            }
                            else {
                                return `${type} ${varName}=${varValue};\n`;
                            }
                        }
                    }
                }
            }
        }
    },

    "type": [
        "int",
        "float",
        "string",
        "char"
    ]
};

module.exports.DICTIONARY = DICTIONARY;