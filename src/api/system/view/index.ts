import request from '@/utils/request';
import { ViewTypeForm, DictTypeVO, DictTypeQuery } from './types';
import { AxiosPromise } from 'axios';

// 查询视图列表
export function list(query: DictTypeQuery): AxiosPromise<DictTypeVO[]> {
  return request({
    url: '/view/list',
    method: 'get',
    params: query
  });
}

// 查询字典类型详细
export function getType(dictId: number | string): AxiosPromise<DictTypeVO> {
  return request({
    url: '/dict/type/' + dictId,
    method: 'get'
  });
}

// 新增字典类型
export function addView(data: ViewTypeForm) {
  return request({
    url: '/view/add',
    method: 'post',
    data: data
  });
}

// 修改字典类型
export function updateView(data: ViewTypeForm) {
  return request({
    url: '/view/add',
    method: 'post',
    data: data
  });
}

// 删除字典类型
export function delType(dictId: string | number | Array<string | number>) {
  return request({
    url: '/system/dict/type/' + dictId,
    method: 'delete'
  });
}

// 刷新字典缓存
export function refreshCache() {
  return request({
    url: '/system/dict/type/refreshCache',
    method: 'delete'
  });
}

// 获取字典选择框列表
export function optionselect(): AxiosPromise<DictTypeVO[]> {
  return request({
    url: '/system/dict/type/optionselect',
    method: 'get'
  });
}
