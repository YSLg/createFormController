"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: 杨海波
 * @Date: 2021-07-27 18:11:57
 * @LastEditors: 杨海波
 * @LastEditTime: 2021-07-28 11:00:10
 * @FilePath: /create-form-controller/src/reactForm/useForm.tsx
 */
var react_1 = __importStar(require("react"));
var formStore_1 = __importDefault(require("../formStore"));
function useForm(form) {
    var formRef = react_1.default.useRef();
    if (!formRef.current) {
        if (form) {
            formRef.current = form;
        }
        else {
            var formStore = new formStore_1.default({});
            formRef.current = formStore;
        }
    }
    react_1.useEffect(function () {
        return function () {
            formRef.current = null;
        };
    }, []);
    return [formRef.current];
}
exports.default = useForm;
//# sourceMappingURL=useForm.js.map