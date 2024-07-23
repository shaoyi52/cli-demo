export const basicProps ={
    model: {
      type: Object ,
      default: () => ({}),
    },
    // 标签宽度  固定宽度
    labelWidth: {
      type: [Number, String] ,
      default: 0,
    },
    fieldMapToTime: {
      type: Array ,
      default: () => [],
    },
    compact: Boolean,
    // 表单配置规则
    schemas: {
      type: Array ,
      default: () => [],
    },
    mergeDynamicData: {
      type: Object ,
      default: null,
    },
    baseRowStyle: {
      type: Object, 
    },
    baseColProps: {
      type: Object, 
    },
    autoSetPlaceHolder:  {
      type: Boolean,
      default:true, 
    },
    // 在INPUT组件上单击回车时，是否自动提交
    autoSubmitOnEnter: {
      type: Boolean,
      default:false, 
    },
    submitOnReset: Boolean,
    submitOnChange: Boolean,
    size: {
      type:String,
      default:'default',
    },
    // 禁用表单
    disabled: Boolean,
    emptySpan: {
      type: [Number, Object] ,
      default: 0,
    },
    // 是否显示收起展开按钮
    showAdvancedButton:Boolean,
    // 转化时间
    transformDateFunc: {
      type: Function ,
      default: (date: any) => {
        return date?.format?.('YYYY-MM-DD HH:mm:ss') ?? date;
      },
    },
    rulesMessageJoinLabel: {
      type:Boolean,
      default:true,
    },
    // 超过3行自动折叠
    autoAdvancedLine:{
      type:Number,
      default:3,
    },
    // 不受折叠影响的行数
    alwaysShowLines: {
      type:Number,
      default:1,
    },
  
    // 是否显示操作按钮
    showActionButtonGroup:{
      type:Boolean,
      default:true,
    },
    // 操作列Col配置
    actionColOptions: Object ,
    // 显示重置按钮
    showResetButton: {
      type:Boolean,
      default:true,
    },
    // 是否聚焦第一个输入框，只在第一个表单项为input的时候作用
    autoFocusFirstItem: Boolean,
    // 重置按钮配置
    resetButtonOptions: Object ,
  
    // 显示确认按钮
    showSubmitButton:{
      type:Boolean,
      default:true,
    },
    // 确认按钮配置
    submitButtonOptions: Object ,
  
    // 自定义重置函数
    resetFunc: Function ,
    submitFunc: Function ,
  
    // 以下为默认props
    hideRequiredMark: Boolean,
  
    labelCol: Object,
  
    layout: {
      type:String,
      default:'horizontal',
    },
    tableAction: {
      type: Object ,
    },
  
    wrapperCol: Object ,
  
    colon: Boolean,
  
    labelAlign: String,
  
    rowProps: Object ,
  };
