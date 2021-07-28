/*
 * @Descripttion:
 * @version:
 * @Author: 杨海波
 * @Date: 2021-07-27 18:11:57
 * @LastEditors: 杨海波
 * @LastEditTime: 2021-07-27 18:13:10
 * @FilePath: /createFormController/src/reactForm/useForm.tsx
 */
import React, { useEffect } from 'react';
import Store from '../formStore';

function useForm(form: any) {
  const formRef: any = React.useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new Store({});
      formRef.current = formStore;
    }
  }
  useEffect(() => {
    return () => {
      formRef.current = null;
    };
  }, []);
  return [formRef.current];
}
export default useForm;
