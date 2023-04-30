import { Button, Typography } from "@mui/material";
import { GridRowModesModel, GridRowModes } from "@mui/x-data-grid-pro";
import { AnyAction } from "@reduxjs/toolkit";
import Iconify from "components/iconify";
import { TFunction } from "i18next";
import React, { Dispatch } from "react";
import { paperTypeActions } from "scenes/papers/redux/slice";
import { useAppDispatch } from "store";

interface EditToolbarProps {
  handleAddClick: () => void;
  trans: TFunction<"trans", undefined, "trans">;
}
function EditToolbar(props: EditToolbarProps) {
  const { handleAddClick, trans } = props;

  return (
    <Button
      variant="outlined"
      size="large"
      sx={{ ml: 2, mt: 2 }}
      startIcon={<Iconify icon="material-symbols:add" />}
      onClick={handleAddClick}
    >
      <Typography>{trans("printtype.printTypeAdd.title")}</Typography>
    </Button>
  );
}

export default EditToolbar;
