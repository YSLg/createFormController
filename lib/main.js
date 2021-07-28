"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = exports.Store = exports.Form = void 0;
/*
 * @Descripttion:
 * @version:
 * @Author: 杨海波
 * @Date: 2021-07-21 23:10:57
 * @LastEditors: 杨海波
 * @LastEditTime: 2021-07-27 18:37:26
 * @FilePath: /createFormController/src/main.ts
 */
const index_1 = __importDefault(require("./formStore/index"));
exports.Store = index_1.default;
const reactForm_1 = __importDefault(require("./reactForm"));
exports.Form = reactForm_1.default;
const useForm_1 = __importDefault(require("./reactForm/useForm"));
exports.useForm = useForm_1.default;
//# sourceMappingURL=main.js.map