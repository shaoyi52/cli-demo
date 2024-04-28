
export const NAME_OPTIONS = [
  { label: 'A', value: '1' },
  { label: 'B', value: '2' },
  { label: 'C', value: '3' },
];

export const TYPE_OPTIONS = [
  { label: 'Type A', value: '1' },
  { label: 'Type B', value: '2' },
  { label: 'Type C', value: '3' },
];

export const ADDRESS_OPTIONS = [
  { label: '广东省深圳市南山区', value: '1' },
  { label: '北京市海淀区', value: '2' },
  { label: '上海市徐汇区', value: '3' },
  { label: '四川省成都市高新区', value: '4' },
  { label: '广东省广州市天河区', value: '5' },
  { label: '陕西省西安市高新区', value: '6' },
];

export const FORM_RULES = {
name: [{ required: true, trigger: "blur", message: "请输入合同名称" }],  
type: [{ required: true, message: '请选择合同类型',trigger: 'blur'  }],
title: [{ required: true, message: '请输入发票抬头',trigger: 'blur'  }],
amount: [{ required: true, message: '请输入合同金额',trigger: 'blur'  }],
consignee: [{ required: true, message: '请输入收货人',trigger: 'blur'  }],
mobileNum: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
deliveryAddress: [{ required: true, message: '请输入收货地址', trigger: 'blur' }],
fullAddress: [{ required: true, message: '请输入详细地址',trigger: 'blur'  }],
};

export const INITIAL_DATA1= {
  name: '',
  invoiceType: '',   
  amount: 0,    
};
export const INITIAL_DATA2= {
  name: '',
  type: '',
};
export const INITIAL_DATA3= {
  consignee: '',
  mobileNum: '',
  deliveryAddress: '',
  fullAddress: '', 
};

