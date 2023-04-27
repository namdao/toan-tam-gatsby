import { Button, Typography } from "@mui/material";
import { randomId } from "@mui/x-data-grid-generator";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
} from "@mui/x-data-grid-pro";
import Iconify from "components/iconify";
import { TFunction } from "i18next";
import React from "react";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  trans: TFunction<"trans", undefined, "trans">;
}
function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, trans } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      { id, name: "", group: "color", isNew: true },
      ...oldRows,
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <Button
      variant="outlined"
      size="large"
      sx={{ ml: 2, mt: 2 }}
      startIcon={<Iconify icon="material-symbols:add" />}
      onClick={handleClick}
    >
      <Typography>{trans("printtype.printTypeAdd.title")}</Typography>
    </Button>
  );
}

export default EditToolbar;
