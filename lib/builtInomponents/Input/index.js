"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./index.css");
function Input(preventProps) {
    var title = preventProps.title, props = preventProps.props, value = preventProps.value, onInput = preventProps.onInput, errorMassage = preventProps.errorMassage, allowClearHandler = preventProps.allowClearHandler;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("span", { className: "title" }, title),
        react_1.default.createElement("input", __assign({ onInput: onInput, value: value }, props)),
        errorMassage ? react_1.default.createElement("p", { style: { color: 'red' } }, errorMassage) : null,
        value ? react_1.default.createElement("svg", { viewBox: '64 64 896 896', focusable: 'false', "data-icon": 'close', width: '1em', height: '1em', fill: 'currentColor', "aria-hidden": 'true', onClick: allowClearHandler },
            react_1.default.createElement("path", { d: 'M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z' })) : null));
}
exports.default = Input;
//# sourceMappingURL=index.js.map