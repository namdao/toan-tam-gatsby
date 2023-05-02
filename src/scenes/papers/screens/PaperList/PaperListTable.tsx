import React from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridColDef,
  GridPreProcessEditCellProps,
  GridEditInputCell,
  GridRenderCellParams,
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
  GridRowId,
  useGridApiRef,
} from "@mui/x-data-grid-pro";
import {
  styled,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  LinearProgress,
} from "@mui/material";
import { IResPrintType } from "scenes/printtype/redux/types";
import Label from "components/label";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditToolbar from "./Toolbar";
import { useLocales } from "locales";
import { useAppDispatch, useAppSelector } from "store";
import { paperTypeActions, PaperTypeSelector } from "scenes/papers/redux/slice";
import { usePaperTypes } from "scenes/papers/hooks/usePaperTypes";
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

const PrintTypeTable = () => {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const {
    onUpdatePaper,
    onAddNewPaper,
    onDeletePaper,
    onGetPaperList,
    loading,
  } = usePaperTypes();
  const dispatch = useAppDispatch();
  const paperList = useAppSelector(PaperTypeSelector.getListPaper);
  const apiRef = useGridApiRef();
  const { translate } = useLocales();
  let lastIdRow = -1;
  if (paperList.length > 0) {
    lastIdRow =
      paperList.reduce((prev, current) =>
        prev.id > current.id ? prev : current
      ).id + 1;
  }
  if (loading) {
    return (
      <Box sx={{ margin: "10% auto", width: "50%" }}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    const data = apiRef.current.getRowWithUpdatedValues(id, "id");
    if (!data.paper_code || !data.paper_name) {
      return;
    }
    let status = false;
    if (!data.isNew) {
      status = await onUpdatePaper(data.id, {
        name: data.paper_name,
        code: data.paper_code,
      });
    } else {
      status = await onAddNewPaper({
        name: data.paper_name,
        code: data.paper_code,
      });
    }
    if (!status) return;
    setTimeout(() => {
      onGetPaperList("refresh");
    }, 400);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: number) => async () => {
    const status = await onDeletePaper(id);
    if (!status) return;
    dispatch(paperTypeActions.deleteNewRow(id));
  };

  const handleCancelClick = (id: number) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = paperList.find((row) => row.id === id);
    if (editedRow!.isNew) {
      dispatch(paperTypeActions.deleteNewRow(id));
    }
  };

  const handleAddClick = () => {
    const id = lastIdRow + 1;
    const newRow = {
      id: id,
      paper_name: "",
      paper_code: "",
      isNew: true,
    };
    dispatch(paperTypeActions.addNewRow(newRow));
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "paper_name" },
    }));
  };

  const totalRow = paperList.length;
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "STT",
      headerAlign: "center",
      align: "center",
      renderCell: (index) =>
        index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1,
    },
    {
      field: "paper_name",
      headerName: "Loại giấy",
      flex: 1,
      editable: true,
      preProcessEditCellProps: ({ props }: GridPreProcessEditCellProps) => {
        const hasError = props.value.length < 1;
        return { ...props, error: hasError ? "Không để trống" : "" };
      },
      renderEditCell: (props) => {
        return (
          <StyledTooltip open={!!props.error} title={props.error}>
            <GridEditInputCell {...props} />
          </StyledTooltip>
        );
      },
      renderCell: ({ value }: GridRenderCellParams<IResPrintType>) => {
        return <Label color="primary">{value}</Label>;
      },
    },
    {
      field: "paper_code",
      headerName: "Mã loại giấy",
      flex: 1,
      editable: true,
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
              onClick={handleSaveClick(id as number)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id as number)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id as number)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id as number)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGridPro
        apiRef={apiRef}
        rows={paperList}
        columns={columns}
        rowCount={totalRow}
        editMode="row"
        rowModesModel={rowModesModel}
        components={{
          Row: MemoizedRow,
          ColumnHeaders: MemoizedColumnHeaders,
        }}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            trans: translate,
            handleAddClick: handleAddClick,
          },
        }}
      />
    </Box>
  );
};
export default PrintTypeTable;
