"use strict";
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
const const_1 = require("./const");
const reducer = (state, { type, ...payload }) => {
    switch (type) {
        case const_1.SET:
            return {
                ...state,
                [Object.keys(payload)[0]]: {
                    ...state[Object.keys(payload)[0]],
                    value: payload[Object.keys(payload)[0]],
                },
            };
        case const_1.ADD:
            return {
                ...state,
                [Object.keys(payload)[0]]: {
                    ...payload[Object.keys(payload)[0]],
                    errorMessageList: [
                        {
                            field: Object.keys(payload)[0],
                            message: '',
                        },
                    ],
                },
            };
        case const_1.UPDATEMESSAGE:
            return {
                ...state,
                [Object.keys(payload)[0]]: {
                    ...state[Object.keys(payload)[0]],
                    errorMessageList: payload[Object.keys(payload)[0]],
                },
            };
    }
};
exports.default = reducer;
//# sourceMappingURL=reducer.js.map