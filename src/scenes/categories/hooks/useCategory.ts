import { deepClone } from "@mui/x-data-grid/utils/utils";
import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { apiGetAllCategory } from "../redux/api";
import { IResCategory, IDataTableCategory } from "../redux/types";

export const useCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listCategory, setListCategory] = useState<IDataTableCategory[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const onGetCategory = async () => {
    try {
      setLoading(true);
      const result: IResponseType<IResCategory[]> = await apiGetAllCategory();
      if (result.data) {
        const listParent = result.data.filter((e) => e.parent_id === null);
        const listChild = result.data.filter((e) => e.parent_id !== null);
        const listTree = [];
        for (let p = 0; p < listParent.length; p++) {
          let group = [listParent[p].category_name];
          const parent = listParent[p];
          listTree.push({ ...parent, group });
          for (let i = 0; i < listChild.length; i++) {
            const child = listChild[i];
            if (child.parent_id === parent.id) {
              const tempGroup = deepClone(group);
              tempGroup.push(child.category_name);
              listTree.push({
                ...child,
                group: tempGroup,
              });
            }
          }
        }
        setListCategory(listTree);
        console.log(listTree);
      } else {
        enqueueSnackbar(translate("category.error.categoryList"), {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onGetCategory error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    onGetCategory,
    loading,
    listCategory,
  };
};
