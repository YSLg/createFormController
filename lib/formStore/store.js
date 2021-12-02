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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var async_validator_1 = __importDefault(require("async-validator"));
var action_1 = require("./action");
var reducer_1 = __importDefault(require("./reducer"));
var Store = /** @class */ (function () {
    function Store(preLoadState) {
        var _this = this;
        // collectionRules
        this.collectionRulesStoreList = [];
        this._finishFailedwatch = null;
        // 是否全都验证通过
        this.passThrough = false;
        this.lastTimeParams = null;
        this.subscribeList = [];
        this.setInitialValues = function (payload) {
            setTimeout(function () {
                var _a;
                for (var key in payload) {
                    if (Object.prototype.hasOwnProperty.call(_this._currentState, key)) {
                        var element = payload[key];
                        if (element) {
                            _this.dispatch((_a = { type: 'set' }, _a[key] = element, _a));
                        }
                    }
                }
            });
        };
        this.getState = function () {
            var currentValue = {};
            Object.keys(_this._currentState).forEach(function (item) {
                currentValue[item] = _this._currentState[item].value;
            });
            return currentValue;
        };
        this.getCurrentState = function () {
            return _this._currentState;
        };
        this.getValue = function (name) {
            var _current = {};
            Object.keys(_this._currentState).forEach(function (item) {
                _current[item] = _this._currentState[item].value;
            });
            return _current[name];
        };
        // 收集所有field正则回调
        this._collectionRules = function (_a) {
            var _b;
            var type = _a.type, payload = __rest(_a, ["type"]);
            _this.collectionRulesStoreList.push((_b = {},
                _b[Object.keys(payload)[0]] = function (val) {
                    _this._validateOne(Object.keys(payload)[0]);
                },
                _b));
        };
        // 修改其中一个
        this._validateAll = function () {
            var current = _this._currentState;
            var descriptor = {};
            var currentValue = {};
            Object.keys(current).forEach(function (item) {
                descriptor[item] = current[item].validate;
                currentValue[item] = current[item].value;
            });
            var validator = new async_validator_1.default(descriptor);
            validator
                .validate(currentValue)
                .then(function (res) {
                _this.passThrough = false;
                _this._finishFailedwatch && _this._finishFailedwatch();
                console.log('全部验证成功');
            })
                .catch(function (_a) {
                var errors = _a.errors, fields = _a.fields;
                _this.passThrough = true;
                console.log('有验证失败的', errors, fields);
                _this._finishFailedwatch && _this._finishFailedwatch();
            });
        };
        // 修改其中一个
        this._validateOne = function (field) {
            var current = _this._currentState[field];
            var descriptor = {};
            var currentValue = {};
            descriptor[field] = current.validate;
            currentValue[field] = current.value;
            var validator = new async_validator_1.default(descriptor);
            validator
                .validate(currentValue)
                .then(function (res) {
                var _a;
                _this.dispatch((_a = {
                        type: 'upDateupMessage'
                    },
                    _a[field] = [
                        {
                            field: field,
                            message: '',
                        },
                    ],
                    _a));
                for (var i = 0; i < _this.subscribeList.length; i++) {
                    var name_1 = Object.keys(_this.subscribeList[i])[0];
                    if (field === name_1) {
                        _this.subscribeList[i][name_1]();
                    }
                }
            })
                .catch(function (_a) {
                var errors = _a.errors, fields = _a.fields;
                _this.dispatch(__assign({ type: 'upDateupMessage' }, fields));
                for (var i = 0; i < _this.subscribeList.length; i++) {
                    var name_2 = Object.keys(_this.subscribeList[i])[0];
                    if (field === name_2) {
                        _this.subscribeList[i][name_2]();
                    }
                }
            });
        };
        this.subscribe = function (cb, field) {
            var _a;
            _this.subscribeList.push((_a = {},
                _a[field] = cb,
                _a));
        };
        this.onFinishFailed = function (cb) {
            if (_this._finishFailedwatch)
                return;
            _this._finishFailedwatch = cb;
        };
        this.dispatch = function (action) {
            switch (action.type) {
                // 初始化store
                case 'add':
                    _this._collectionRules(action);
                    _this._currentState = _this._reducer(_this._currentState, action_1.add_action(action));
                    break;
                // 更新store,value
                case 'set':
                    _this._currentState = _this._reducer(_this._currentState, action_1.set_action(action));
                    for (var i = 0; i < _this.collectionRulesStoreList.length; i++) {
                        var name_3 = Object.keys(_this.collectionRulesStoreList[i])[0];
                        if (Object.keys(action)[1] === name_3) {
                            _this.collectionRulesStoreList[i][name_3]();
                        }
                    }
                    _this._validateAll();
                    break;
                // 更新error message
                case 'upDateupMessage':
                    _this._currentState = _this._reducer(_this._currentState, action_1.upDateupMessage_action(action));
                    break;
                // 更新focusStatus
                case 'upDateupFocusStatus':
                    _this._currentState = _this._reducer(_this._currentState, action_1.upDateupFocusStatus_action(action));
                    break;
                case 'upDateupDisabled':
                    _this._currentState = _this._reducer(_this._currentState, action_1.upDateupDateDisabled_action(action));
                    console.log(_this._currentState, '-_______');
                    break;
            }
        };
        this.debounce = function (fn, delay) {
            var timer = null;
            return function () {
                if (timer) {
                    clearTimeout(timer);
                    timer = setTimeout(fn, delay);
                }
                else {
                    timer = setTimeout(fn, delay);
                }
            };
        };
        this._currentState = preLoadState;
        this._reducer = reducer_1.default;
    }
    return Store;
}());
exports.default = Store;
//# sourceMappingURL=store.js.map