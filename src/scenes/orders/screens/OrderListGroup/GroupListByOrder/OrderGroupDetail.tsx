import { Box, Stack, Typography } from "@mui/material";
import Label from "components/label";
import { IOurSources } from "constant/commonType";
import React, { FC, useEffect } from "react";
import { useOrderDetail } from "scenes/orders/hooks/useOrderDetail";
import { getDataOutsource } from "utils/utility";
import SkeletonCustomer from "../../OrderStored/SkeletonCustomer";

type IProps = {
  idOrder: number;
};
const OrderGroupDetail: FC<IProps> = ({ idOrder }) => {
  const {
    loading,
    orderDetail: order,
    onOrderDetail,
  } = useOrderDetail(idOrder);

  useEffect(() => {
    onOrderDetail();
  }, []);

  if (!loading && !order) return <></>;

  const renderRowOutSource = (outsources: IOurSources[]) => {
    const { dataGroupOutsources, keyOutSource } = getDataOutsource(outsources);
    return keyOutSource.map((nameKey) => {
      const listChildByKey = dataGroupOutsources[nameKey];
      return (
        <Stack key={nameKey} direction="row" sx={{ pt: 1 }}>
          <Typography variant="body2" sx={{ width: 110 }}>
            {nameKey}
          </Typography>
          <Stack direction="row" flexWrap="wrap" sx={{ flex: 1 }}>
            {listChildByKey.map((child) => {
              return (
                <Label key={child.id} sx={{ mx: 0.5, mb: 1 }}>
                  {child.name}
                </Label>
              );
            })}
          </Stack>
        </Stack>
      );
    });
  };
  return (
    <Box sx={{ p: 1 }}>
      <Stack direction={"row"} spacing={2}>
        <Box>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ pb: 1 }}
          >
            <Typography variant="subtitle2">Loại giấy </Typography>
            <Label>{order?.paper.paper_name}</Label>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ pb: 1 }}
          >
            <Typography variant="subtitle2">Kiểu in:</Typography>
            <Label> {order?.print_types?.[0]?.print_type_name}</Label>
          </Stack>
        </Box>
        <Box>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ pb: 1 }}
          >
            <Typography variant="subtitle2">SL mẫu</Typography>
            <Label>{order?.template_number}</Label>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ pb: 1 }}
          >
            <Typography variant="subtitle2">SL in:</Typography>
            <Label>{order?.quantity}</Label>
          </Stack>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ pb: 1 }}>
            Kích thước
          </Typography>
          <Label sx={{ flex: 1 }}>{order?.method}</Label>
        </Box>
      </Stack>
      <Typography variant="subtitle2">
        Ghi chú sản xuất: {order?.order_detail_notes || "null"}
      </Typography>
      {order && order?.outsources && renderRowOutSource(order?.outsources)}
    </Box>
  );
};
export default OrderGroupDetail;
