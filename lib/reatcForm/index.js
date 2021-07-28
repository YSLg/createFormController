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
Object.defineProperty(exports, "__esModule", { value: true });
exports.From = void 0;
/*
 * @Descripttion:
 * @version:
 * @Author: 杨海波
 * @Date: 2021-07-27 16:15:52
 * @LastEditors: 杨海波
 * @LastEditTime: 2021-07-27 16:18:51
 * @FilePath: /createFormController/src/reatcForm/index.tsx
 */
const react_1 = __importStar(require("react"));
const CloneDemo = (conponent, props) => {
    return react_1.default.cloneElement(conponent, props);
};
const baseConponents = {
    input: react_1.default.createElement("input", null),
};
const Field = (props) => {
    const { form, conponents } = props;
    const [value, setValue] = react_1.useState(props.value);
    const [errorMassage, setErrorMassage] = react_1.useState('');
    // 初始化
    const initData = () => {
        form.dispatch({
            type: 'add',
            [props.field]: {
                value: props.value,
                validate: props.validate,
            },
        });
    };
    // 订阅错误
    const subscriptionErrorTip = () => {
        form.subscribe(() => {
            setErrorMassage(form._currentState[props.field].errorMessageList[0].message);
        }, props.field);
    };
    react_1.useEffect(() => {
        initData();
        subscriptionErrorTip();
    }, []);
    const conponentsMerge = react_1.useMemo(() => {
        const conponentsObj = {};
        for (const key in conponents) {
            if (conponentsObj[conponents[key].type.name])
                return;
            conponentsObj[conponents[key].type.name] = conponents[key];
        }
        return {
            ...baseConponents,
            ...conponentsObj,
        };
    }, [conponents]);
    const oninput = (e) => {
        setValue(e.target.value);
        form.dispatch({ type: 'set', [props.field]: e.target.value });
    };
    const delectItem = () => {
        setValue('');
        form.dispatch({ type: 'set', [props.field]: '' });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, conponentsMerge[props.type] &&
        CloneDemo(conponentsMerge[props.type], {
            ...props,
            errorMassage,
            value,
            onInput: oninput,
            allowClearHandler: delectItem,
        })));
};
const From = (props) => {
    const { form, rule = [], conponents } = props;
    return (react_1.default.createElement("div", null, rule.map((item, index) => {
        return (react_1.default.createElement(Field, { key: index, conponents: conponents, form: form, ...item }));
    })));
};
exports.From = From;
//# sourceMappingURL=index.js.map