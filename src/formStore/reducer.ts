/*
 * @Descripttion:
 * @version:
 * @Author: 杨海波
 * @Date: 2021-07-21 23:16:23
 * @LastEditors: 杨海波
 * @LastEditTime: 2021-11-24 15:55:49
 * @FilePath: /create-form-controller/src/formStore/reducer.ts
 */
import {
  SET,
  ADD,
  UPDATEUPMESSAGE,
  UPDATEUPFOCUSSTATUS,
  UPDATEUPDISABLED,
} from './const';
const reducer = (state: any, { type, ...payload }: any) => {
  switch (type) {
    case SET:
      console.log(payload, 'payload[Object.keys(payload)[0]]');
      return {
        ...state,
        [Object.keys(payload)[0]]: {
          ...state[Object.keys(payload)[0]],
          value: payload[Object.keys(payload)[0]],
        },
      };
    case ADD:
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
    case UPDATEUPMESSAGE:
      return {
        ...state,
        [Object.keys(payload)[0]]: {
          ...state[Object.keys(payload)[0]],
          errorMessageList: payload[Object.keys(payload)[0]],
        },
      };
    case UPDATEUPFOCUSSTATUS:
      return {
        ...state,
        [Object.keys(payload)[0]]: {
          ...state[Object.keys(payload)[0]],
          focusStatus: payload[Object.keys(payload)[0]],
        },
      };
    case UPDATEUPDISABLED:
      return {
        ...state,
        [Object.keys(payload)[0]]: {
          ...state[Object.keys(payload)[0]],
          disabled: payload[Object.keys(payload)[0]],
        },
      };
  }
};
export default reducer;
