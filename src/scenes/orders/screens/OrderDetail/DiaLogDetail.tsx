import { Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, {
  createRef,
  FC,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useLocales } from "locales";
import Iconify from "components/iconify";
import OrderDetail from "./index";
const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

type IDataOrder = {
  orderId: number;
  orderName: string;
};
type IOrderDetailProps = {
  onOpen: (data: IDataOrder) => void;
  onClose: () => void;
};
export const magicOrderDetailRef = createRef<IOrderDetailProps>();

const DiaLogDetail = () => {
  const { translate } = useLocales();
  const [open, setOpen] = useState(false);
  const [dataOrder, setDataOrder] = useState<IDataOrder>({} as IDataOrder);
  useImperativeHandle(magicOrderDetailRef, () => ({
    onOpen: handleClickOpen,
    onClose: handleClose,
  }));
  const handleClickOpen = (data: IDataOrder) => {
    setDataOrder(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      scroll="paper"
      id="order-detail"
      fullWidth
      keepMounted={false}
      maxWidth="lg"
      PaperProps={{
        sx: {
          maxWidth: 1920,
        },
      }}
      onClose={handleClose}
      TransitionComponent={Transition}
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
        <span>
          {translate("orders.orderProcessing.detail", {
            orderId: dataOrder.orderName,
          })}
        </span>
        <Iconify icon="eva:close-fill" width={24} onClick={handleClose} />
      </DialogTitle>
      <DialogContent dividers={true}>
        <OrderDetail orderId={dataOrder.orderId} />
      </DialogContent>
    </Dialog>
  );
};
export default DiaLogDetail;
