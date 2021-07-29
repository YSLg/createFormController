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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: 杨海波
 * @Date: 2021-07-21 23:16:23
 * @LastEditors: 杨海波
 * @LastEditTime: 2021-07-27 13:59:58
 * @FilePath: /createFormController/src/formStore/reducer.ts
 */
var const_1 = require("./const");
var reducer = function (state, _a) {
    var _b, _c, _d;
    var type = _a.type, payload = __rest(_a, ["type"]);
    switch (type) {
        case const_1.SET:
            return __assign(__assign({}, state), (_b = {}, _b[Object.keys(payload)[0]] = __assign(__assign({}, state[Object.keys(payload)[0]]), { value: payload[Object.keys(payload)[0]] }), _b));
        case const_1.ADD:
            return __assign(__assign({}, state), (_c = {}, _c[Object.keys(payload)[0]] = __assign(__assign({}, payload[Object.keys(payload)[0]]), { errorMessageList: [
                    {
                        field: Object.keys(payload)[0],
                        message: '',
                    },
                ] }), _c));
        case const_1.UPDATEMESSAGE:
            return __assign(__assign({}, state), (_d = {}, _d[Object.keys(payload)[0]] = __assign(__assign({}, state[Object.keys(payload)[0]]), { errorMessageList: payload[Object.keys(payload)[0]] }), _d));
    }
};
exports.default = reducer;
//# sourceMappingURL=reducer.js.map