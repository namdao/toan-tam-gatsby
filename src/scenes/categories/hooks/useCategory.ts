import { deepClone } from "@mui/x-data-grid/utils/utils";
import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { useSnackbar } from "notistack";
import { useState } from "react";
import {
  apiAddCategory,
  apiDeleteCategory,
  apiGetAllCategory,
  apiUpdateCategory,
} from "../redux/api";
import { IResCategory, IDataTableCategory, IReqCategory } from "../redux/types";

export const useCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listCategory, setListCategory] = useState<IDataTableCategory[]>([]);
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
        enqueueSnackbar(translate("outsource.success.outsourceAdd"));
      } else {
        status = false;
        enqueueSnackbar(translate("outsource.error.outsourceAdd"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onAddNewOutSource error", {
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
        enqueueSnackbar(translate("outsource.success.outsourceUpdate"));
      } else {
        status = false;
        enqueueSnackbar(translate("outsource.error.outsourceUpdate"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onUpdateOutSource error", {
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
        enqueueSnackbar(translate("outsource.success.outsourceDelete"));
      } else {
        status = false;
        enqueueSnackbar(translate("outsource.error.outsourceDelete"), {
          variant: "error",
        });
      }
    } catch (error) {
      status = false;
      enqueueSnackbar((error as Error)?.message || "onDeleteOutSource error", {
        variant: "error",
      });
    }
    return status;
  };

  return {
    setListCategory,
    onAddCategory,
    onDeleteCategory,
    onUpdateCategory,
    onGetCategory,
    loading,
    listCategory,
  };
};
