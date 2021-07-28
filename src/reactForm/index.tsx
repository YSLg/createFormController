/*
 * @Descripttion:
 * @version:
 * @Author: 杨海波
 * @Date: 2021-07-27 16:15:52
 * @LastEditors: 杨海波
 * @LastEditTime: 2021-07-27 16:22:08
 * @FilePath: /createFormController/src/reactForm/index.tsx
 */
import React, { useEffect, useState, useMemo } from 'react';
const CloneDemo = (
  conponent: React.DetailedReactHTMLElement<any, HTMLElement>,
  props: any
) => {
  return React.cloneElement(conponent, props);
};
const baseConponents = {
  input: <input />,
};
const Field = (props: {
  value?: any;
  field?: any;
  validate?: any;
  type?: any;
  form?: any;
  conponents?: any;
}) => {
  const { form, conponents } = props;
  const [value, setValue] = useState(props.value);
  const [errorMassage, setErrorMassage] = useState('');

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
      setErrorMassage(
        form._currentState[props.field].errorMessageList[0].message
      );
    }, props.field);
  };

  useEffect(() => {
    initData();
    subscriptionErrorTip();
  }, []);

  const conponentsMerge = useMemo(() => {
    const conponentsObj: any = {};
    for (const key in conponents) {
      if (conponentsObj[conponents[key].type.name]) return;
      conponentsObj[conponents[key].type.name] = conponents[key];
    }
    return {
      ...baseConponents,
      ...conponentsObj,
    };
  }, [conponents]);

  const oninput = (e: { target: { value: any } }) => {
    setValue(e.target.value);
    form.dispatch({ type: 'set', [props.field]: e.target.value });
  };

  const delectItem = () => {
    setValue('');
    form.dispatch({ type: 'set', [props.field]: '' });
  };

  return (
    <>
      {conponentsMerge[props.type] &&
        CloneDemo(conponentsMerge[props.type], {
          ...props,
          errorMassage,
          value,
          onInput: oninput,
          allowClearHandler: delectItem,
        })}
    </>
  );
};
export type rule = {
  field: string;
  value: string;
  title: string;
  type: string;
  props: {
    type: string;
    allowClear: boolean;
    maxLength: number;
    placeholder: string;
  };
  wrap: object;
  col: object;
  validate: [
    {
      type: string;
      required: boolean;
    },
    {
      pattern: string;
      message: string;
      trigger: string;
    }
  ];
};
const From = (props: {
  form: any;
  rule?: rule[] | undefined;
  conponents: any;
}) => {
  const { form, rule = [], conponents } = props;
  return (
    <div>
      {rule.map((item) => {
        return (
          <Field
            key={item.field}
            conponents={conponents}
            form={form}
            {...item}
          />
        );
      })}
    </div>
  );
};
export default From;
