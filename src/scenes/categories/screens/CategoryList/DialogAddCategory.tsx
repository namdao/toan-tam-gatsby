import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Iconify from "components/iconify";
import React, { createRef, useImperativeHandle, useState } from "react";
import { useCategory } from "scenes/categories/hooks/useCategory";
import { magicCategoryRef } from "./CategoryTable";
import { LoadingButton } from "@mui/lab";
import { alpha } from "@mui/system";

export type IMagicDialogCatRef = {
  onClose: () => void;
  onOpen: () => void;
};
export const magicDialogCatRef = createRef<IMagicDialogCatRef>();
const DialogAddCategory = () => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const { onAddCategory } = useCategory();

  useImperativeHandle(magicDialogCatRef, () => ({
    onClose: () => setOpen(false),
    onOpen: () => {
        setName('');
        setOpen(true);
    }
  }));

  const onAddName = async () => {
    try {
      setIsLoading(true);
      const result = await onAddCategory({ name });
      if (result) {
        magicCategoryRef.current?.onRefresh();
        setOpen(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      scroll="paper"
      id="caetgory-dialog"
      fullWidth
      keepMounted={false}
      maxWidth="lg"
      PaperProps={{
        sx: {
          maxWidth: 1920,
        },
      }}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          color: "white",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          display: "flex",
        }}
      >
        <span>Tạo danh mục hàng hóa</span>
        <Iconify icon="eva:close-fill" width={24} onClick={handleClose} />
      </DialogTitle>
      <DialogContent dividers={true}>
        <TextField
          fullWidth
          label="Nhập danh mục hàng hóa"
          value={name}
          sx={{mt: 3}}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          fullWidth
          loading={isLoading}
          size="large"
          onClick={onAddName}
          variant="contained"
          sx={{
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.8),
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: (theme) => theme.palette.primary.main,
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Tạo danh mục
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddCategory;
