import React from "react";
import {
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import Iconify from "components/iconify";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { ICON } from "constant/layoutConstant";
import { useLocales } from "locales";
import { IResCompanies } from "scenes/company/redux/types";
import CompanyNewEditForm from "../../components/CompanyNewEditForm";

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

type IPropsCompany = {
  company: IResCompanies;
};
function DialogCompanyDetail({ company }: IPropsCompany) {
  const [open, setOpen] = useState(false);
  const { translate } = useLocales();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <GridActionsCellItem
        onClick={handleClickOpen}
        icon={<Iconify width={ICON.NAV_ITEM} icon="mdi:edit" />}
        label="Chi tiết"
      />
      <Dialog
        fullScreen
        open={open}
        scroll="paper"
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
              {translate("company.companyDetail.title", {
                name: company.company_name,
              })}
            </Typography>
            <IconButton color="inherit" edge="start" onClick={handleClose}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 12 }} />
        <CompanyNewEditForm
          isEdit={true}
          company={company}
          closeModal={handleClose}
        />
      </Dialog>
    </>
  );
}
export default DialogCompanyDetail;
