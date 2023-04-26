import React, { useEffect, useMemo } from "react";
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
} from "@mui/x-data-grid-pro";
import { IOutSource } from "scenes/outsources/redux/types";
import Label from "components/label";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { useOutSource } from "scenes/outsources/hooks/useOutSource";
import { useLocales } from "locales";
import { styled } from "@mui/system";
import AutoSelectGroup from "./AutoSelectGroup";
import EditToolbar from "./Toolbar";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

export default function OutSourceListTable() {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const { translate } = useLocales();
  const {
    outsourceList,
    setOutSourceList,
    onGetOutSourceList,
    onAddNewOutSource,
    onUpdateOutSource,
    onDeleteOutSource,
  } = useOutSource();
  useEffect(() => {
    onGetOutSourceList();
  }, []);
  const apiRef = useGridApiRef();

  const groupSelect = useMemo(() => {
    const listGroup: string[] = [];
    outsourceList.forEach((e) => {
      if (!listGroup.includes(e.group)) {
        listGroup.push(e.group);
      }
    });
    return listGroup;
  }, [outsourceList]);

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    const data = apiRef.current.getRowWithUpdatedValues(id, "id");
    if (!data.name) {
      return;
    }
    let status = false;
    if (!data.isNew) {
      status = await onUpdateOutSource(data.id, {
        name: data.name,
        group: data.group,
      });
    } else {
      status = await onAddNewOutSource({
        name: data.name,
        group: data.group,
      });
    }
    if (!status) return;
    setTimeout(() => {
      onGetOutSourceList();
    }, 400);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    const status = await onDeleteOutSource(parseInt(id.toString()));
    if (!status) return;
    setOutSourceList(outsourceList.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = outsourceList.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setOutSourceList(outsourceList.filter((row) => row.id !== id));
    }
  };

  const renderSelectEditInputCell: GridColDef["renderCell"] = (params) => {
    return <AutoSelectGroup {...params} groupSelect={groupSelect} />;
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "STT",
      renderCell: (index) =>
        index.api.getRowIndexRelativeToVisibleRows(index.row.id),
    },
    {
      field: "name",
      headerName: "Loại gia công",
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
      renderCell: ({ value }: GridRenderCellParams<IOutSource>) => {
        return <Label color="primary">{value}</Label>;
      },
    },
    {
      field: "group",
      headerName: "Nhóm",
      flex: 1,
      renderEditCell: renderSelectEditInputCell,
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
        rows={outsourceList}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        slots={{
          toolbar: EditToolbar,
        }}
        getRowId={(row) => row.id}
        slotProps={{
          toolbar: {
            setRows: setOutSourceList,
            trans: translate,
            setRowModesModel,
          },
        }}
      />
    </Box>
  );
}
