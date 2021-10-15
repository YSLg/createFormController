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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: 杨海波
 * @Date: 2021-07-27 16:15:52
 * @LastEditors: 杨海波
 * @LastEditTime: 2021-08-01 16:25:11
 * @FilePath: /create-form-controller/src/reactForm/index.tsx
 */
var react_1 = __importStar(require("react"));
var CloneDemo = function (conponent, props) {
    return react_1.default.cloneElement(conponent, props);
};
var baseConponents = {
    input: react_1.default.createElement("input", null),
};
var Field = react_1.memo(function (props) {
    var form = props.form, conponents = props.conponents;
    var _a = react_1.useState(props.value), value = _a[0], setValue = _a[1];
    var _b = react_1.useState(''), errorMassage = _b[0], setErrorMassage = _b[1];
    // 初始化
    var initData = function () {
        var _a;
        form.dispatch((_a = {
                type: 'add'
            },
            _a[props.field] = {
                value: props.value,
                validate: props.validate,
            },
            _a));
    };
    // 订阅错误 可以不去订阅错误
    var subscriptionErrorTip = function () {
        form.subscribe(function () {
            setErrorMassage(form._currentState[props.field].errorMessageList[0].message);
        }, props.field);
    };
    react_1.useEffect(function () {
        initData();
        subscriptionErrorTip();
    }, []);
    var conponentsMerge = react_1.useMemo(function () {
        var conponentsObj = {};
        for (var key in conponents) {
            if (conponentsObj[conponents[key].type.name])
                return;
            conponentsObj[conponents[key].type.name] = conponents[key];
        }
        return __assign(__assign({}, baseConponents), conponentsObj);
    }, [conponents]);
    var oninput = function (e) {
        var _a;
        setValue(e.target.value);
        form.dispatch((_a = { type: 'set' }, _a[props.field] = e.target.value, _a));
    };
    var delectItem = function () {
        var _a;
        setValue('');
        form.dispatch((_a = { type: 'set' }, _a[props.field] = '', _a));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, conponentsMerge[props.type] &&
        CloneDemo(conponentsMerge[props.type], __assign(__assign({}, props), { errorMassage: errorMassage, value: value, onInput: oninput, allowClearHandler: delectItem }))));
});
var From = function (props) {
    var form = props.form, _a = props.rule, rule = _a === void 0 ? [] : _a, conponents = props.conponents;
    var mergeList = __spreadArray([], conponents);
    return (react_1.default.createElement("div", null, rule.map(function (item) {
        return (react_1.default.createElement(Field, __assign({ key: item.field, conponents: mergeList, form: form }, item)));
    })));
};
exports.default = From;
//# sourceMappingURL=index.js.map