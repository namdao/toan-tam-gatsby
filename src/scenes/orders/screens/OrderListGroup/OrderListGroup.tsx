import React, { FC, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { IOrderDetail, IOrderGroup } from "scenes/orders/redux/types";
import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Label from "components/label";
import SkeletonCustomer from "../OrderStored/SkeletonCustomer";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";
import ImagePopup from "scenes/orders/components/ImagePopup";
import { getImageToAws } from "utils/imageHandler";
import { getDataOutsource } from "utils/utility";
import { IOurSources } from "constant/commonType";
import {
  GROUP_ORDER_TYPE,
  STATUS_ORDER_GROUP,
} from "scenes/orders/helper/OrderConstant";
import OrderBtnDoneGroup from "./OrderBtnDoneGroup";
import OrderBtnUpdateGroup from "./OrderBtnUpdateGroup";
import OrderBtnRemoveGroup from "./OrderBtnRemoveGroup";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import OrderBtnStoreGroup from "./OrderBtnStoreGroup";
import useOrderGroup from "scenes/orders/hooks/useOrderGroup";
import OrderBtnApproveGroup from "./OrderBtnApproveGroup";
import appconstants from "constant/appConstant";

const { ROLES } = appconstants;
type IProps = {
  screen: "WAITING_APPROVED" | "PRINTING" | "PRINTED";
};
const OrderListGroup: FC<IProps> = ({ screen }) => {
  const { ref, inView } = useInView({
    threshold: 0.8,
  });
  const { onOrderGroupByStatus } = useOrderGroup();
  const roleUser = useAppSelector(AuthSelector.getRolesUser);
  const rolePrinter = roleUser[0].name === ROLES.PRINTER;
  const roleStore = roleUser[0].name === ROLES.STORE;
  const roleAdmin = roleUser[0].name === ROLES.ADMIN;
  const queryOrder = async ({ pageParam = 1 }) => {
    switch (screen) {
      case "WAITING_APPROVED":
        return onOrderGroupByStatus(
          pageParam,
          STATUS_ORDER_GROUP.WAITING_APPROVED
        );
      case "PRINTING":
        return onOrderGroupByStatus(
          pageParam,
          STATUS_ORDER_GROUP.PRINTING_GROUP
        );
      case "PRINTED":
        return onOrderGroupByStatus(
          pageParam,
          STATUS_ORDER_GROUP.PRINTED_GROUP
        );
    }
  };
  const {
    fetchNextPage,
    hasNextPage,
    data,
    refetch,
    isInitialLoading,
    isFetching,
  } = useInfiniteQuery<
    {
      data: IOrderGroup[];
      pageParam: number;
    },
    unknown,
    {
      data: IOrderGroup[];
      pageParam: number;
    },
    QueryKey
  >({
    queryKey: [screen],
    queryFn: queryOrder,
    getNextPageParam: (lastPage) => {
      return lastPage.pageParam > -1 ? lastPage.pageParam : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const dataGroup: IOrderGroup[] = [];
  data?.pages?.forEach((paging) =>
    paging?.data?.forEach((cus) => {
      dataGroup.push(cus);
    })
  );

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

  const renderImageOrder = (images?: string[]) => {
    const imgUrl =
      images && images?.length > 0 ? getImageToAws(images[0]) : null;
    return (
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.grey[300],
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {imgUrl ? (
          <ImagePopup url={[imgUrl]} width={100} height={100} />
        ) : (
          <Iconify width={100} icon="mdi:image-off-outline" />
        )}
      </Box>
    );
  };

  const renderBlockInfoOrder = (order: IOrderDetail) => {
    return (
      <Box sx={{ pl: 2, flex: 1 }}>
        <Stack direction={"row"} spacing={2}>
          <Box>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              sx={{ pb: 1 }}
            >
              <Typography variant="subtitle2">Loại giấy</Typography>
              <Label>{order.paper.paper_name}</Label>
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
              <Label>{order.template_number}</Label>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              sx={{ pb: 1 }}
            >
              <Typography variant="subtitle2">SL in:</Typography>
              <Label>{order.quantity}</Label>
            </Stack>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ pb: 1 }}>
              Kích thước
            </Typography>
            <Label sx={{ flex: 1 }}>{order.method}</Label>
          </Box>
        </Stack>
        <Typography variant="subtitle2">
          Ghi chú sản xuất: {order.order_detail_notes}
        </Typography>
      </Box>
    );
  };

  const listActionForPrinter = (item: IOrderGroup) => {
    const ids = item.orders.map((i) => i.id);
    return (
      <OrderBtnDoneGroup
        idsOrder={ids}
        idGroup={item.id}
        groupName={item.group_name}
        groupType={item.group_type}
        refetch={refetch}
      />
    );
  };

  const listActionForWaitingApproved = (item: IOrderGroup) => {
    const ids = item.orders.map((i) => i.id);
    console.log("item", item);
    return (
      <>
        <OrderBtnRemoveGroup
          groupName={item.group_name}
          idGroup={[item.id]}
          refetch={refetch}
        />
        {item?.group_type === GROUP_ORDER_TYPE.MULTI_ORDER && (
          <OrderBtnUpdateGroup item={item} refetch={refetch} />
        )}
        <OrderBtnApproveGroup
          idsOrder={ids}
          idGroup={[item.id]}
          groupName={item.group_name}
          refetch={refetch}
        />
      </>
    );
  };

  const listActionForStore = (item: IOrderGroup) => {
    const ids = item.orders.map((i) => i.id);
    return (
      <OrderBtnStoreGroup
        idGroup={item.id}
        idsOrder={ids}
        refetch={refetch}
        groupType={item.group_type}
        orderNo={item.orders[0].order_no}
      />
    );
  };

  const renderHeader = (item: IOrderGroup) => {
    let iconWithType = "ic:outline-looks-one";
    if (item.group_type === GROUP_ORDER_TYPE.MULTI_ORDER) {
      iconWithType = "icon-park-outline:one-to-many";
    } else if (item.group_type === GROUP_ORDER_TYPE.ONLY_ORDER_MULTI_GROUP) {
      iconWithType = "icon-park:one-to-many";
    }

    return (
      <Stack
        direction={"row"}
        spacing={2}
        // justifyContent={"space-between"}
        sx={{ pb: 1.5 }}
      >
        <Stack alignItems={"center"} direction={"row"}>
          <Iconify width={ICON.NAV_ITEM} color="grey" icon={iconWithType} />
          <Label color="primary" sx={{ fontSize: 16, ml: 1 }}>
            {item.group_name}
          </Label>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          {(roleStore || roleAdmin) &&
            screen === "PRINTED" &&
            listActionForStore(item)}
          {(rolePrinter || roleAdmin) &&
            screen === "PRINTING" &&
            listActionForPrinter(item)}
          {(rolePrinter || roleAdmin) &&
            screen === "WAITING_APPROVED" &&
            listActionForWaitingApproved(item)}
        </Stack>
      </Stack>
    );
  };

  const dataLoad = isInitialLoading ? [] : dataGroup;

  return (
    <Stack>
      {dataLoad.length > 0 ? (
        dataLoad.map((item, i) => {
          return (
            <Box
              key={item.id}
              ref={dataGroup.length === i + 1 ? ref : null}
              sx={{ my: 2 }}
            >
              {renderHeader(item)}
              <Grid container spacing={2}>
                {item.orders.map((order) => {
                  return (
                    <Grid key={order.id} item xs={6} md={4}>
                      <Box
                        sx={{
                          height: "100%",
                          py: 1.5,
                          px: 1.5,
                          flexDirection: "row",
                          borderStyle: "dashed",
                          borderWidth: 1,
                          borderRadius: 2,
                          borderColor: (theme) => theme.palette.primary.light,
                          backgroundColor: (theme) =>
                            theme.palette.primary.lighter,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                          }}
                        >
                          {order.order_no} - {order.name}
                        </Typography>
                        <Stack direction={"row"}>
                          {renderImageOrder(order?.images)}
                          {renderBlockInfoOrder(order)}
                        </Stack>
                        {order?.outsources &&
                          renderRowOutSource(order.outsources)}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
              <Divider sx={{ borderStyle: "dashed", my: 2 }} />
            </Box>
          );
        })
      ) : isInitialLoading ? (
        <SkeletonCustomer />
      ) : (
        <Card sx={{ mt: 2, mb: 2, p: 3 }}>
          <Label color="warning">Không có đơn hàng nào</Label>
        </Card>
      )}
      {isFetching && dataGroup.length > 0 && (
        <Stack alignItems="center" sx={{ mt: 2 }}>
          <CircularProgress />
        </Stack>
      )}
    </Stack>
  );
};

export default OrderListGroup;
