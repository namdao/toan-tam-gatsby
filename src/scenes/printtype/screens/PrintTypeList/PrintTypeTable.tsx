import React, { useEffect } from "react";
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
import { styled, Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import { usePrintType } from "scenes/printtype/hooks/usePrintType";
import { IResPrintType } from "scenes/printtype/redux/types";
import Label from "components/label";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditToolbar from "./Toolbar";
import { useLocales } from "locales";
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
  const {
    loading,
    listPrintType,
    setListPrintType,
    onGetPrintTypes,
    onUpdatePrintType,
    onAddPrintType,
    onDeletePrintType,
  } = usePrintType();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const apiRef = useGridApiRef();
  const { translate } = useLocales();
  useEffect(() => {
    onGetPrintTypes();
  }, []);

  // if (loading) {
  //   return (
  //     <Box sx={{ margin: "10% auto", width: "50%" }}>
  //       <LinearProgress color="primary" />
  //     </Box>
  //   );
  // }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    const data = apiRef.current.getRowWithUpdatedValues(id, "id");
    console.log("data", data);
    if (!data.print_type_name) {
      return;
    }
    let status = false;
    if (!data.isNew) {
      status = await onUpdatePrintType(data.id, {
        name: data.print_type_name,
        group: data.group,
      });
    } else {
      status = await onAddPrintType({
        name: data.print_type_name,
        group: data.group,
      });
    }
    if (!status) return;
    setTimeout(() => {
      onGetPrintTypes();
    }, 400);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    const status = await onDeletePrintType(parseInt(id.toString()));
    if (!status) return;
    setListPrintType(listPrintType.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = listPrintType.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setListPrintType(listPrintType.filter((row) => row.id !== id));
    }
  };

  const totalRow = listPrintType.length;
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
      field: "print_type_name",
      headerName: "Loại in",
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
      field: "group",
      headerName: "Nhóm",
      flex: 1,
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
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGridPro
        apiRef={apiRef}
        rows={listPrintType}
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
            setRows: setListPrintType,
            trans: translate,
            setRowModesModel,
          },
        }}
      />
    </Box>
  );
};
export default PrintTypeTable;
