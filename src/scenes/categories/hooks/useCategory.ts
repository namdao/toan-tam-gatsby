import { deepClone } from "@mui/x-data-grid/utils/utils";
import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useAppDispatch } from "store";
import {
  apiAddCategory,
  apiDeleteCategory,
  apiGetAllCategory,
  apiGetCategoriesLikeMobiles,
  apiUpdateCategory,
} from "../redux/api";
import { categoriesActions } from "../redux/slice";
import {
  IResCategory,
  IDataTableCategory,
  IReqCategory,
  IResCategories,
} from "../redux/types";

export const useCategory = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [listCategory, setListCategory] = useState<IDataTableCategory[]>([]);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const onGetCategory = async (action: "idle" | "refresh") => {
    try {
      action === "idle" && setLoading(true);
      const result: IResponseType<IResCategory[]> = await apiGetAllCategory();
      if (result.data) {
        const listParent = result.data.filter((e) => e.parent_id === null);
        const listChild = result.data.filter((e) => e.parent_id !== null);
        const listTree = [];
        for (let p = 0; p < listParent.length; p++) {
          let group = [listParent[p].category_name];
          const parent = listParent[p];
          let count = 0;
          for (let i = 0; i < listChild.length; i++) {
            const child = listChild[i];
            if (child.parent_id === parent.id) {
              count++;
              const tempGroup = deepClone(group);
              tempGroup.push(child.category_name);
              listTree.push({
                ...child,
                group: tempGroup,
              });
            }
          }
          listTree.push({
            ...parent,
            category_name_with_count: `${parent.category_name} (${count})`,
            group,
          });
        }
        setListCategory(listTree);
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
      action === "idle" && setLoading(false);
    }
  };

  const onAddCategory = async (payload: IReqCategory): Promise<boolean> => {
    let status = true;
    try {
      const result: IResponseType<any> = await apiAddCategory(payload);
      if (result?.data) {
        enqueueSnackbar(translate("category.success.categoryAdd"));
      } else {
        status = false;
        enqueueSnackbar(translate("category.error.categoryAdd"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onAddCategory error", {
        variant: "error",
      });
    }
    return status;
  };
  const onUpdateCategory = async (id: number, payload: IReqCategory) => {
    let status = true;
    try {
      const result: IResponseType<any> = await apiUpdateCategory(id, payload);
      if (result?.data) {
        enqueueSnackbar(translate("category.success.categoryEdit"));
      } else {
        status = false;
        enqueueSnackbar(translate("category.error.categoryEdit"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onUpdateCategory error", {
        variant: "error",
      });
    }
    return status;
  };
  const onDeleteCategory = async (id: number) => {
    let status = true;
    try {
      const result: IResponseType<any> = await apiDeleteCategory(id);
      if (result?.data) {
        enqueueSnackbar(translate("category.success.categoryDelete"));
      } else {
        status = false;
        enqueueSnackbar(translate("category.error.categoryDelete"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onDeleteCategory error", {
        variant: "error",
      });
    }
    return status;
  };

  const onGetCategoriesLikeMobile = async () => {
    try {
      setLoading(true);
      const result: IResponseType<IResCategories> =
        await apiGetCategoriesLikeMobiles();
      if (result.data) {
        dispatch(categoriesActions.seCategoriesSuccess(result.data));
      }
    } catch (error) {
      enqueueSnackbar(
        (error as Error)?.message || "onGetCategoriesLikeMobile error",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    setListCategory,
    onAddCategory,
    onDeleteCategory,
    onUpdateCategory,
    onGetCategory,
    onGetCategoriesLikeMobile,
    loading,
    listCategory,
  };
};
