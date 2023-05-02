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
  trans: TFunction<"trans", undefined, "trans">;
  handleAddClick: () => void;
}
function EditToolbar(props: EditToolbarProps) {
  const { trans, handleAddClick } = props;

  return (
    <Button
      sx={{ ml: 2, mt: 2 }}
      variant="outlined"
      size="large"
      startIcon={<Iconify icon="material-symbols:add" />}
      onClick={handleAddClick}
    >
      <Typography>{trans("outsource.outsourceAdd.title")}</Typography>
    </Button>
  );
}

export default EditToolbar;
