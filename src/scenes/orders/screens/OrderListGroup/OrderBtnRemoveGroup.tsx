import { LoadingButton } from "@mui/lab";
import React, { FC } from "react";
import { AuthSelector } from "scenes/auth/redux/slice";
import { STATUS_ORDER_GROUP } from "scenes/orders/helper/OrderConstant";
import useOrderGroup from "scenes/orders/hooks/useOrderGroup";
import { IReqUpdateOrderPrinted } from "scenes/orders/redux/types";
import { useAppSelector } from "store";

type IProps = {
  idGroup: number[];
  refetch: () => void;
  groupName: string;
};
const OrderBtnRemoveGroup: FC<IProps> = ({ idGroup, refetch, groupName }) => {
  const { onUpdateOrderGroup, loading } = useOrderGroup();
  const account = useAppSelector(AuthSelector.getProfile);
  const handleUpdateOrderGroup = async () => {
    for (let i = 0; i <= idGroup.length - 1; i++) {
      const payload: IReqUpdateOrderPrinted = {
        status: STATUS_ORDER_GROUP.DELETE_GROUP,
        notes: `${account.userName} Xóa bình bài ${groupName}`,
      };
      await onUpdateOrderGroup(idGroup[i], payload);
    }
    refetch();
  };
  return (
    <LoadingButton
      variant="contained"
      color="error"
      loading={loading}
      onClick={handleUpdateOrderGroup}
    >
      Xoá Bài
    </LoadingButton>
  );
};

export default OrderBtnRemoveGroup;
