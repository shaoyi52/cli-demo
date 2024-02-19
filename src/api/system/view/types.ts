export interface DictTypeVO extends BaseEntity {
  dictId: number | string;
  dictName: string;
  dictType: string;
  remark: string;
}

export interface ViewTypeForm {
  modelName?: string | undefined;
  name?: string | undefined;
  title?: string | undefined;
  type?: string | undefined;
  isValid?: boolean;
  componentCfg?: string | undefined | null;
  customCfg?: string | undefined | null;
  remark?: string | undefined;
}

export interface DictTypeQuery extends PageQuery {
  id?: number | null;
  dictName?: string;
  dictType?: string;
}
