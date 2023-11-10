import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useLocales } from "locales";
import React, { Ref, useEffect, useImperativeHandle, useState } from "react";
import { IOrderDetail, IReqCreateGroup } from "scenes/orders/redux/types";
import {
  GROUP_ORDER_TYPE,
  STATUS_ORDER_GROUP,
} from "scenes/orders/helper/OrderConstant";
import { LoadingButton } from "@mui/lab";
import { GridRowId } from "@mui/x-data-grid";
import useOrderGroup from "scenes/orders/hooks/useOrderGroup";

export type IPropsGroup = {
  selectOrderGroup: (val: IOrderDetail[]) => void;
  resetOrderGroup: () => void;
};
type IProps = {
  onRefreshList: () => void;
};
const OrderCreateGroup = React.forwardRef(
  ({ onRefreshList }: IProps, ref: Ref<IPropsGroup>) => {
    const { translate } = useLocales();
    const { loading, onCreateGroupDraftOrder } = useOrderGroup();
    const [orderList, setOrderList] = useState<IOrderDetail[]>([]);
    const [groupType, setGroupType] = useState<GROUP_ORDER_TYPE>();
    const [groupName, setGroupName] = useState<string>("");
    const [numberCreateOrder, setNumberCreateOrder] = useState(0);
    const actionParent = () => ({
      selectOrderGroup: (val: IOrderDetail[]) => {
        setOrderList(val);
      },
      resetOrderGroup: () => setOrderList([]),
    });

    useImperativeHandle(ref, actionParent);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const dataChange = (event.target as HTMLInputElement).value;
      setGroupType(Number(dataChange) as GROUP_ORDER_TYPE);
    };
    const handeChangeGroupName = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const dataChange = (event.target as HTMLInputElement).value;
      setGroupName(dataChange);
    };
    const handeChangeQuantity = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const dataChange = (event.target as HTMLInputElement).value;
      setNumberCreateOrder(Number(dataChange));
    };

    useEffect(() => {
      if (orderList.length > 1) {
        setGroupType(GROUP_ORDER_TYPE.MULTI_ORDER);
      } else if (orderList.length === 1) {
        setGroupType(GROUP_ORDER_TYPE.ONLY_ONE_ORDER);
      } else {
        setGroupType(undefined);
      }
    }, [orderList]);

    const onSubmitCreateGroup = async () => {
      if (groupType !== undefined) {
        const dataPayload: IReqCreateGroup = {
          order_ids: orderList.map((e) => e.id),
          name: groupName,
          group_type: groupType,
          numberCreateOrder,
          status: STATUS_ORDER_GROUP.WAITING_APPROVED,
        };
        const result = await onCreateGroupDraftOrder(dataPayload);
        if (result.success) {
          onRefreshList();
          setGroupType(undefined);
          setGroupName("");
          setOrderList([]);
        }
      }
    };

    return (
      <Stack
        direction="row"
        justifyContent={"space-between"}
        spacing={3}
        sx={{ m: 2 }}
      >
        <FormControl>
          <FormLabel>Chọn loại bình bài</FormLabel>
          <RadioGroup onChange={handleChange}>
            <Stack direction="row">
              <FormControlLabel
                value={GROUP_ORDER_TYPE.MULTI_ORDER}
                control={
                  <Radio checked={groupType === GROUP_ORDER_TYPE.MULTI_ORDER} />
                }
                disabled={orderList.length < 2}
                label={translate(
                  "orders.orderWaitingPrintList.group.btnMultiOrder"
                )}
              />
              <FormControlLabel
                value={GROUP_ORDER_TYPE.ONLY_ONE_ORDER}
                control={
                  <Radio
                    checked={groupType === GROUP_ORDER_TYPE.ONLY_ONE_ORDER}
                  />
                }
                disabled={orderList.length !== 1}
                label={translate(
                  "orders.orderWaitingPrintList.group.btnOnlyOrder"
                )}
              />
              <FormControlLabel
                value={GROUP_ORDER_TYPE.ONLY_ORDER_MULTI_GROUP}
                control={
                  <Radio
                    checked={
                      groupType === GROUP_ORDER_TYPE.ONLY_ORDER_MULTI_GROUP
                    }
                  />
                }
                disabled={orderList.length !== 1}
                label={translate(
                  "orders.orderWaitingPrintList.group.btnMultiGroup"
                )}
              />
            </Stack>
          </RadioGroup>
        </FormControl>
        <Stack direction={"row"} alignItems={"center"} spacing={3}>
          {groupType !== undefined && (
            <TextField
              fullWidth
              sx={{ flex: 2 }}
              onChange={handeChangeGroupName}
              placeholder={"Nhập tên bình bài"}
            />
          )}
          {groupType === GROUP_ORDER_TYPE.ONLY_ORDER_MULTI_GROUP && (
            <TextField
              fullWidth
              type="number"
              sx={{ flex: 2 }}
              onChange={handeChangeQuantity}
              placeholder={"Nhập số lượng bài"}
            />
          )}
          <LoadingButton
            variant="contained"
            type="submit"
            size="large"
            sx={{ flex: 1 }}
            loading={loading}
            onClick={onSubmitCreateGroup}
            disabled={orderList.length < 1}
          >
            {translate("orders.orderWaitingPrintList.group.title")}
          </LoadingButton>
        </Stack>
      </Stack>
    );
  }
);
export default OrderCreateGroup;
