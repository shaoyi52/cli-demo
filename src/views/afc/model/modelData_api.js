import createIo from "@/utils/createIo";
const apis={
  modelViews:{
      url: '/view/list',
      method: 'get',
  }, 
  modelViewsAdd:{
    url: '/view/add',
    method: 'post',
  },   
};

export default createIo(apis,'model');