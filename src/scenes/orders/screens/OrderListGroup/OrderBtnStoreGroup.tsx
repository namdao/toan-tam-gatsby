import { LoadingButton } from "@mui/lab";
import React, { FC } from "react";
import { AuthSelector } from "scenes/auth/redux/slice";
import { GROUP_ORDER_TYPE } from "scenes/orders/helper/OrderConstant";
import useOrderGroup from "scenes/orders/hooks/useOrderGroup";
import { useAppSelector } from "store";

type IProps = {
  idGroup: number;
  groupType: GROUP_ORDER_TYPE;
  orderNo: string;
  idsOrder: number[];
  refetch: () => void;
};
const OrderBtnStoreGroup: FC<IProps> = ({
  idGroup,
  idsOrder,
  orderNo,
  groupType,
  refetch,
}) => {
  const { onStoreMultiOrder, loading } = useOrderGroup();
  const userName = useAppSelector(AuthSelector.getProfile).userName;
  const handleUpdateOrderGroup = async () => {
    const status = await onStoreMultiOrder(
      idGroup,
      groupType,
      orderNo,
      idsOrder,
      userName
    );
    if (status) {
      refetch();
    }
  };
  return (
    <LoadingButton
      variant="contained"
      loading={loading}
      onClick={handleUpdateOrderGroup}
    >
      Lưu kho
    </LoadingButton>
  );
};

export default OrderBtnStoreGroup;
