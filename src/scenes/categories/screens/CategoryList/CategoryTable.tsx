import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModesModel,
  GridRowModes,
  DataGridPro,
  GridColDef,
  GridEditInputCell,
  GridActionsCellItem,
  GridRowId,
  GridRenderCellParams,
  GridPreProcessEditCellProps,
  useGridApiRef,
  GridRow,
  GridColumnHeaders,
  GRID_ROOT_GROUP_ID,
  GridGroupNode,
  GridGroupingColDefOverride,
} from "@mui/x-data-grid-pro";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { useLocales } from "locales";
import { styled } from "@mui/system";
import AutoSelectGroup from "./AutoSelectGroup";
import { useCategory } from "scenes/categories/hooks/useCategory";
import EditToolbar from "./Toolbar";
import { LinearProgress } from "@mui/material";
import { IResCategory } from "scenes/categories/redux/types";
import Label from "components/label";
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

export type IMagicCatRef = {
  onRefresh: () => Promise<void>;
};
export const magicCategoryRef = createRef<IMagicCatRef>();
export default function CategoryTable() {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const { translate } = useLocales();
  const {
    loading,
    listCategory,
    onGetCategory,
    setListCategory,
    onAddCategory,
    onUpdateCategory,
    onDeleteCategory,
  } = useCategory();

  useImperativeHandle(magicCategoryRef, () => ({
    onRefresh: () => onGetCategory("refresh"),
  }));

  useEffect(() => {
    onGetCategory("idle");
  }, []);
  const apiRef = useGridApiRef();

  const groupSelect = useMemo(() => {
    const listGroup = listCategory
      .filter((e) => e.parent_id === null)
      .map((f) => {
        return { label: f.category_name, id: f.id };
      });
    return listGroup;
  }, [listCategory]);

  let lastIdRow = -1;
  if (listCategory.length > 0) {
    lastIdRow =
      listCategory.reduce((prev, current) =>
        prev.id > current.id ? prev : current
      ).id + 1;
  }

  const handleAddClick = () => {
    const id = lastIdRow + 1;
    const parentDefault = listCategory.find((e) => e.parent_id)
      ?.category_parent as IResCategory;
    setListCategory((oldRows) => [
      {
        id,
        category_name: "",
        parent_id: listCategory[0].parent_id,
        category_parent: parentDefault,
        group: [""],
        isNew: true,
      },
      ...oldRows,
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "category_parent" },
    }));
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit },
      selected: {
        id,
      },
    });
  };

  // handle expand group
  useEffect(() => {
    if (rowModesModel?.selected?.id) {
      const groups =
        apiRef.current.getRowNode<GridGroupNode>(GRID_ROOT_GROUP_ID)!.children;

      if (groups.length > 1) {
        const idSelect = rowModesModel?.selected.id;
        const dataRow = apiRef.current.getRow(idSelect);
        if (dataRow.parent_id) {
          apiRef.current.setRowChildrenExpansion(
            dataRow.parent_id,
            !apiRef.current.getRowNode<GridGroupNode>(dataRow.parent_id)!
              .childrenExpanded
          );
          apiRef.current.setCellFocus(dataRow.parent_id, "category_parent");
        }
      }
    }
  }, [rowModesModel]);

  const handleSaveClick = (id: GridRowId) => async () => {
    const data = apiRef.current.getRowWithUpdatedValues(id, "id");
    if (
      (!data.category_name || !data.category_parent?.id) &&
      data.parent_id !== null
    ) {
      return;
    }
    let status = false;
    if (!data.isNew) {
      status = await onUpdateCategory(data.id, {
        name: data.category_name,
        parent_id: data?.category_parent?.id,
      });
    } else {
      status = await onAddCategory({
        name: data.category_name,
        parent_id: data?.category_parent?.id,
      });
    }
    if (!status) return;
    setTimeout(() => {
      onGetCategory("refresh");
    }, 400);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    const status = await onDeleteCategory(parseInt(id.toString()));
    if (!status) return;
    setListCategory(listCategory.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = listCategory.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setListCategory(listCategory.filter((row) => row.id !== id));
    }
  };

  const renderSelectEditInputCell: GridColDef["renderCell"] = (params) => {
    if (!params.row.category_parent) return "";
    return <AutoSelectGroup {...params} groupSelect={groupSelect} />;
  };

  const columnsData: GridColDef[] = [
    {
      field: "id",
      headerName: "STT",
      align: "center",
      headerAlign: "center",
      renderCell: (index) =>
        index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1,
    },
    {
      field: "category_parent",
      flex: 1,
      headerName: "Danh mục cha",
      editable: true,
      renderEditCell: renderSelectEditInputCell,
      renderCell: ({ row }: GridRenderCellParams<IResCategory>) => {
        if (row?.category_parent?.category_name) return "";
        return <Label color="primary">{row?.category_name_with_count}</Label>;
      },
    },
    {
      field: "category_name",
      headerName: "Danh mục",
      flex: 1,
      editable: true,
      preProcessEditCellProps: ({ props }: GridPreProcessEditCellProps) => {
        const hasError = props.value.length < 1;
        return { ...props, error: hasError ? "Không để trống" : "" };
      },
      renderCell: ({ row, value }: GridRenderCellParams<IResCategory>) => {
        if (!row.category_parent) return "";
        return value;
      },
      renderEditCell: (props) => {
        return (
          <StyledTooltip open={!!props.error} title={props.error}>
            <GridEditInputCell {...props} />
          </StyledTooltip>
        );
      },
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const GROUPING_COL_DEF: GridGroupingColDefOverride<IResCategory> = {
    headerName: "",
    maxWidth: 30,
    hideDescendantCount: false,
    valueGetter: () => {
      return "";
    },
  };

  if (loading) {
    return (
      <Box sx={{ margin: "10% auto", width: "50%" }}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <DataGridPro
        treeData
        getTreeDataPath={(row) => row.group}
        rows={listCategory}
        apiRef={apiRef}
        columns={columnsData}
        editMode="row"
        rowModesModel={rowModesModel}
        components={{
          Row: MemoizedRow,
          ColumnHeaders: MemoizedColumnHeaders,
        }}
        slots={{
          toolbar: EditToolbar,
        }}
        groupingColDef={GROUPING_COL_DEF}
        pagination
        slotProps={{
          toolbar: {
            trans: translate,
            handleAddClick,
          },
        }}
      />
    </Box>
  );
}
