import {
  ICategoryDefault,
  IResCategories,
} from "scenes/categories/redux/types";

export const getListCategoryId = (
  listCategory: IResCategories,
  tab: ICategoryDefault
) => {
  switch (tab) {
    case "Card":
    case "Sticker":
    case "Tờ rơi": {
      if (listCategory[tab]) {
        return listCategory[tab].map((e) => e.id).join(",");
      }
      return "";
    }
    default:
      let listRestChild: number[] = [];
      Object.entries(listCategory).filter((parent) => {
        if (
          parent[0] === "Card" ||
          parent[0] === "Sticker" ||
          parent[0] === "Tờ rơi"
        ) {
          return "";
        }
        const restParent = Array.from(parent[1], (val) => {
          return val.id;
        });
        listRestChild = listRestChild.concat(restParent);
        return listRestChild;
      });

      return listRestChild.join(",");
  }
};
