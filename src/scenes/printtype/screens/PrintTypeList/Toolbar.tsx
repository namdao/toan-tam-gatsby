import { Button, Typography } from "@mui/material";
import Iconify from "components/iconify";
import { TFunction } from "i18next";
import React from "react";

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
