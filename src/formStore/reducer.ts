/*
 * @Descripttion:
 * @version:
 * @Author: 杨海波
 * @Date: 2021-07-21 23:16:23
 * @LastEditors: 杨海波
 * @LastEditTime: 2021-07-27 13:59:58
 * @FilePath: /createFormController/src/formStore/reducer.ts
 */
import { SET, ADD, UPDATEMESSAGE } from './const';
const reducer = (state: any, { type, ...payload }: any) => {
  switch (type) {
    case SET:
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
    case UPDATEMESSAGE:
      return {
        ...state,
        [Object.keys(payload)[0]]: {
          ...state[Object.keys(payload)[0]],
          errorMessageList: payload[Object.keys(payload)[0]],
        },
      };
  }
};
export default reducer;
