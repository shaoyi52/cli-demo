import classNames from "../_util/classNames";
export const flexWrapValues = ['wrap', 'nowrap', 'wrap-reverse'];
export const justifyContnteValue =[
  'flex-start',
  'flex-end',
  'start',
  'end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
  'normal',
  'left',
  'right',
];

export const alignItemsValues = [
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'self-start',
  'self-end',
  'baseline',
  'normal',
  'stretch',
]; 

const genClsWrap=(prefixCls,props)=>{
  const wrapCls={};
  flexWrapValues.forEach(cssKey => {
    wrapCls[`${prefixCls}-wrap-${cssKey}`]=props.wrap===cssKey;
  });
  return wrapCls;
};

const genClsAlign=(prefixCls,props)=>{
  const alignCls={};
  alignItemsValues.forEach(cssKey=>{
    alignCls[`${prefixCls}-align-${cssKey}`]=props.align===cssKey;
  });
  return alignCls;
};

const genClsJustify=(prefixCls,props)=>{
  const justifyCls={};
  justifyContnteValue.forEach(cssKey=>{
    justifyCls[`${prefixCls}-justify-${cssKey}`]=props.justify===cssKey;
  });
  return justifyCls;
};

function createFlexClassNames(prefixCls,props){
  return classNames({
    ...genClsWrap(prefixCls,props),
    ...genClsAlign(prefixCls,props),
    ...genClsJustify(prefixCls,props),
  });
}

export default createFlexClassNames;