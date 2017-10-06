"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("../parser");
var rule_1 = require("../rule");
/**
 * `Indentation`
 *
 * *Core rule*
 */
var Indentation = /** @class */ (function (_super) {
    __extends(Indentation, _super);
    function Indentation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Indentation.prototype.verify = function (document, ruleset) {
        var reports = [];
        var lastNode;
        document.walk(function (node) {
            if (lastNode instanceof parser_1.TextNode) {
                var matched = lastNode.textContent.match(/\n(\s+$)/);
                if (matched) {
                    var spaces = matched[1];
                    if (!spaces) {
                        throw new TypeError("Expected error.");
                    }
                    var rule = ruleset.rules.indentation;
                    if (rule === 'tab') {
                        if (!/^\t+$/.test(spaces)) {
                            var line = lastNode.line + 1;
                            var col = lastNode.textContent.lastIndexOf(spaces);
                            reports.push("Expected spaces. Indentaion is required tabs. (" + line + ":" + col + ")");
                        }
                    }
                    // console.log({t: lastNode.textContent, next: `${node.nodeName}`});
                }
            }
            lastNode = node;
        });
        return reports;
    };
    return Indentation;
}(rule_1.default));
exports.Indentation = Indentation;
exports.default = new Indentation('indentation');