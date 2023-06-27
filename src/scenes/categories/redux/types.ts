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

export type ICategoryDefault =
  | "Carbonless"
  | "Card"
  | "Catalogue"
  | "Folder"
  | "Hộp giấy"
  | "Lịch"
  | "Ngoài Trời"
  | "Office"
  | "Sticker"
  | "Túi giấy"
  | "Tờ rơi"
  | "other";
export type IDataCategories = {
  category_name: string;
  category_parent: IResCategory | null;
  id: number;
  parent_id: number | null;
};
export type IResCategories = Record<ICategoryDefault, IDataCategories[]>;
