import { LoadingButton } from "@mui/lab";
import React, { FC } from "react";
import { AuthSelector } from "scenes/auth/redux/slice";
import { STATUS_ORDER_GROUP } from "scenes/orders/helper/OrderConstant";
import useOrderGroup from "scenes/orders/hooks/useOrderGroup";
import { IReqUpdateOrderPrinted } from "scenes/orders/redux/types";
import { useAppSelector } from "store";

type IProps = {
  idGroup: number[];
  idsOrder?: number[];
  refetch: () => void;
  groupName: string;
};
const OrderBtnApproveGroup: FC<IProps> = ({
  idGroup,
  idsOrder,
  refetch,
  groupName,
}) => {
  const { onUpdateOrderGroup, loading } = useOrderGroup();
  const account = useAppSelector(AuthSelector.getProfile);
  const handleUpdateOrderGroup = async () => {
    for (let i = 0; i <= idGroup.length - 1; i++) {
      const payload: IReqUpdateOrderPrinted = {
        order_ids: idsOrder,
        status: STATUS_ORDER_GROUP.PRINTING_GROUP,
        notes: `${account.userName} duyệt bình bài ${groupName}`,
      };
      await onUpdateOrderGroup(idGroup[i], payload);
    }
    refetch();
  };
  return (
    <LoadingButton
      variant="contained"
      color="success"
      loading={loading}
      onClick={handleUpdateOrderGroup}
    >
      Duyệt bài
    </LoadingButton>
  );
};

export default OrderBtnApproveGroup;
