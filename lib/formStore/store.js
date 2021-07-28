"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: 杨海波
 * @Date: 2021-07-21 23:18:58
 * @LastEditors: 杨海波
 * @LastEditTime: 2021-07-27 14:57:20
 * @FilePath: /createFormController/src/formStore/store.ts
 */
const async_validator_1 = __importDefault(require("async-validator"));
const action_1 = require("./action");
const reducer_1 = __importDefault(require("./reducer"));
class Store {
    constructor(preLoadState) {
        // collectionRules
        this.collectionRulesStoreList = [];
        this._finishFailedwatch = null;
        // 是否全都验证通过
        this.passThrough = false;
        this.subscribeList = [];
        this.subscribe = (cb, field) => {
            this.subscribeList.push({
                [field]: cb,
            });
        };
        this.onFinishFailed = (cb) => {
            if (this._finishFailedwatch)
                return;
            this._finishFailedwatch = cb;
        };
        this._currentState = preLoadState;
        this._reducer = reducer_1.default;
    }
    dispatch(action) {
        switch (action.type) {
            // 初始化store
            case 'add':
                this._collectionRules(action);
                this._currentState = this._reducer(this._currentState, action_1.add_action(action));
                break;
            // 更新store,value
            case 'set':
                this._currentState = this._reducer(this._currentState, action_1.set_action(action));
                for (let i = 0; i < this.collectionRulesStoreList.length; i++) {
                    const name = Object.keys(this.collectionRulesStoreList[i])[0];
                    if (Object.keys(action)[1] === name) {
                        this.collectionRulesStoreList[i][name]();
                    }
                }
                this._validateAll();
                break;
            // 更新error message
            case 'upDateMessage':
                this._currentState = this._reducer(this._currentState, action_1.upDateMessage_action(action));
                break;
        }
    }
    setInitialValues(payload) {
        this.dispatch({ type: 'set', ...payload });
    }
    get getState() {
        const currentValue = {};
        Object.keys(this._currentState).forEach((item) => {
            currentValue[item] = this._currentState[item].value;
        });
        return currentValue;
    }
    getValue(name) {
        const _current = {};
        Object.keys(this._currentState).forEach((item) => {
            _current[item] = this._currentState[item].value;
        });
        return _current[name];
    }
    // 收集所有field正则回调
    _collectionRules({ type, ...payload }) {
        this.collectionRulesStoreList.push({
            [Object.keys(payload)[0]]: (val) => {
                this._validateOne(Object.keys(payload)[0]);
            },
        });
    }
    // 验证全部
    _validateAll() {
        const current = this._currentState;
        const descriptor = {};
        const currentValue = {};
        Object.keys(current).forEach((item) => {
            descriptor[item] = current[item].validate;
            currentValue[item] = current[item].value;
        });
        const validator = new async_validator_1.default(descriptor);
        validator
            .validate(currentValue)
            .then((res) => {
            this.passThrough = false;
            this._finishFailedwatch();
            console.log('全部验证成功');
        })
            .catch(({ errors, fields }) => {
            this.passThrough = true;
            this._finishFailedwatch();
            console.log('有验证失败的');
        });
    }
    // 修改其中一个
    _validateOne(field) {
        const current = this._currentState[field];
        const descriptor = {};
        const currentValue = {};
        descriptor[field] = current.validate;
        currentValue[field] = current.value;
        const validator = new async_validator_1.default(descriptor);
        validator
            .validate(currentValue)
            .then((res) => {
            this.dispatch({
                type: 'upDateMessage',
                [field]: [
                    {
                        field,
                        message: '',
                    },
                ],
            });
            for (let i = 0; i < this.subscribeList.length; i++) {
                const name = Object.keys(this.subscribeList[i])[0];
                if (field === name) {
                    this.subscribeList[i][name]();
                }
            }
        })
            .catch(({ errors, fields }) => {
            this.dispatch({
                type: 'upDateMessage',
                ...fields,
            });
            for (let i = 0; i < this.subscribeList.length; i++) {
                const name = Object.keys(this.subscribeList[i])[0];
                if (field === name) {
                    this.subscribeList[i][name]();
                }
            }
        });
    }
}
exports.default = Store;
//# sourceMappingURL=store.js.map