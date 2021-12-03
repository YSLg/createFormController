import Schema from 'async-validator';
import {
  set_action,
  add_action,
  upDateupMessage_action,
  upDateupFocusStatus_action,
  upDateupDateDisabled_action,
} from './action';
import reducer from './reducer';

class Store {
  constructor(preLoadState: {}) {
    this._currentState = preLoadState;
    this._reducer = reducer;
  }
  // collectionRules
  private collectionRulesStoreList: Array<any> = [];
  private _currentState: any;
  private _reducer;
  private _finishFailedwatch: any = null;
  // 是否全都验证通过
  private passThrough = false;
  public lastTimeParams = null;
  private subscribeList: Array<any> = [];

  public setInitialValues = (payload: any) => {
    setTimeout(() => {
      for (const key in payload) {
        if (Object.prototype.hasOwnProperty.call(this._currentState, key)) {
          const element = payload[key];
          console.log(element, key);
          if (element) {
            this.dispatch({ type: 'set', [key]: element });
          }
        }
      }
    });
  };

  public getState = () => {
    const currentValue: any = {};
    Object.keys(this._currentState).forEach((item) => {
      currentValue[item] = this._currentState[item].value;
    });
    return currentValue;
  };
  public getCurrentState = () => {
    return this._currentState;
  };

  public getValue = (name: any) => {
    const _current: any = {};
    Object.keys(this._currentState).forEach((item) => {
      _current[item] = this._currentState[item].value;
    });
    return _current[name];
  };
  // 收集所有field正则回调
  public _collectionRules = ({ type, ...payload }: any) => {
    this.collectionRulesStoreList.push({
      [Object.keys(payload)[0]]: (val: any) => {
        this._validateOne(Object.keys(payload)[0]);
      },
    });
  };

  // 修改其中一个
  public _validateAll = () => {
    const current = this._currentState;
    const descriptor: any = {};
    const currentValue: any = {};
    Object.keys(current).forEach((item) => {
      descriptor[item] = current[item].validate.map((val: any) => {
        return {
          ...val,
          pattern: val.pattern ? new RegExp(val.pattern[0]) : '',
        };
      });
      currentValue[item] = current[item].value;
    });
    const validator = new Schema(descriptor);
    validator
      .validate(currentValue)
      .then((res) => {
        this.passThrough = false;
        this._finishFailedwatch && this._finishFailedwatch();
        console.log('全部验证成功');
      })
      .catch(({ errors, fields }) => {
        this.passThrough = true;
        console.log('有验证失败的', errors, fields);
        this._finishFailedwatch && this._finishFailedwatch();
      });
  };
  // 修改其中一个
  public _validateOne = (field: string) => {
    const current = this._currentState[field];
    const descriptor: any = {};
    const currentValue: any = {};
    descriptor[field] =
      current.validate &&
      current.validate.map((v: any) => {
        return {
          ...v,
          pattern: v.pattern ? new RegExp(v.pattern[0]) : '',
        };
      });
    currentValue[field] = current.value;
    const validator = new Schema(descriptor);
    validator
      .validate(currentValue)
      .then((res) => {
        this.dispatch({
          type: 'upDateupMessage',
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
          type: 'upDateupMessage',
          ...fields,
        });
        for (let i = 0; i < this.subscribeList.length; i++) {
          const name = Object.keys(this.subscribeList[i])[0];
          if (field === name) {
            this.subscribeList[i][name]();
          }
        }
      });
  };
  public subscribe = (cb: () => any, field: string) => {
    this.subscribeList.push({
      [field]: cb,
    });
  };
  public onFinishFailed = (cb: () => any) => {
    if (this._finishFailedwatch) return;
    this._finishFailedwatch = cb;
  };
  public dispatch = (action: any) => {
    switch (action.type) {
      // 初始化store
      case 'add':
        this._collectionRules(action);
        this._currentState = this._reducer(
          this._currentState,
          add_action(action)
        );
        break;
      // 更新store,value
      case 'set':
        this._currentState = this._reducer(
          this._currentState,
          set_action(action)
        );
        for (let i = 0; i < this.collectionRulesStoreList.length; i++) {
          const name = Object.keys(this.collectionRulesStoreList[i])[0];
          if (Object.keys(action)[1] === name) {
            this.collectionRulesStoreList[i][name]();
          }
        }
        this._validateAll();
        break;
      // 更新error message
      case 'upDateupMessage':
        this._currentState = this._reducer(
          this._currentState,
          upDateupMessage_action(action)
        );
        break;
      // 更新focusStatus
      case 'upDateupFocusStatus':
        this._currentState = this._reducer(
          this._currentState,
          upDateupFocusStatus_action(action)
        );
        break;
      case 'upDateupDisabled':
        this._currentState = this._reducer(
          this._currentState,
          upDateupDateDisabled_action(action)
        );
        console.log(this._currentState, '-_______');
        break;
    }
  };
  public debounce = (fn: { (): void; (): void }, delay: number | undefined) => {
    let timer: NodeJS.Timeout | null = null;
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
      } else {
        timer = setTimeout(fn, delay);
      }
    };
  };
}
export default Store;
