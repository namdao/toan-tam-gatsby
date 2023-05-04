export type IResCategory = {
  category_name: string;
  category_parent: IResCategory | null;
  id: number;
  parent_id: number | null;
  category_name_with_count?: string;
};

export type IDataTableCategory = {
  category_name: string;
  category_parent: IResCategory | null;
  id: number;
  parent_id: number | null;
  group?: string[];
};

export type IReqCategory = {
  parent_id: number;
  name: string;
};
