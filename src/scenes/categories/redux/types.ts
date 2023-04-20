export type IResCategory = {
  category_name: string;
  category_parent: IResCategory | null;
  id: number;
  parent_id: number | null;
};

export type IDataTableCategory = {
  category_name: string;
  category_parent: IResCategory | null;
  id: number;
  parent_id: number | null;
  group: string[];
};
