import createIo from "@/utils/createIo";
const apis={
  modelViews:{
      url: '/view/list',
      method: 'get',
  }, 
};

export default createIo(apis,'model');