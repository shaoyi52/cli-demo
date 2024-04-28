import request from '@/utils/request';
import { DictTypeVO } from '@/api/system/view/types';
import { AxiosPromise } from 'axios';

// 查询视图列表
export function list(query: { name: string }): AxiosPromise<DictTypeVO[]> {
  return request({
    url: `/view/get/${query.name}/list`,
    method: 'get',
    params: {}
  });
}
