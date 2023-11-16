import React, { FC, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { IGroupByOrder, IOrderGroup } from "scenes/orders/redux/types";
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
import Iconify from "components/iconify";
import ImagePopup from "scenes/orders/components/ImagePopup";
import { getImageToAws } from "utils/imageHandler";
import { getDataOutsource } from "utils/utility";
import { IOurSources } from "constant/commonType";
import { STATUS_ORDER_GROUP } from "scenes/orders/helper/OrderConstant";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import useOrderGroup from "scenes/orders/hooks/useOrderGroup";
import OrderBtnDoneGroup from "../OrderBtnDoneGroup";
import OrderBtnRemoveGroup from "../OrderBtnRemoveGroup";
import OrderBtnApproveGroup from "../OrderBtnApproveGroup";
import OrderBtnStoreGroup from "../OrderBtnStoreGroup";
import SkeletonCustomer from "../../OrderStored/SkeletonCustomer";
import OrderGroupDetail from "./OrderGroupDetail";
import appconstants from "constant/appConstant";

const { ROLES } = appconstants;
type IProps = {
  screen: "WAITING_APPROVED" | "PRINTING" | "PRINTED";
};
const GroupListByOrder: FC<IProps> = ({ screen }) => {
  const { ref, inView } = useInView({
    threshold: 0.8,
  });
  const { onGroupListByOrder } = useOrderGroup();
  const roleUser = useAppSelector(AuthSelector.getRolesUser);
  const rolePrinter = roleUser[0].name === ROLES.PRINTER;
  const roleStore = roleUser[0].name === ROLES.STORE;
  const roleAdmin = roleUser[0].name === ROLES.ADMIN;
  const queryOrder = async ({ pageParam = 1 }) => {
    switch (screen) {
      case "WAITING_APPROVED":
        return onGroupListByOrder(
          pageParam,
          STATUS_ORDER_GROUP.WAITING_APPROVED
        );
      case "PRINTING":
        return onGroupListByOrder(pageParam, STATUS_ORDER_GROUP.PRINTING_GROUP);
      case "PRINTED":
        return onGroupListByOrder(pageParam, STATUS_ORDER_GROUP.PRINTED_GROUP);
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
      data: IGroupByOrder[];
      pageParam: number;
    },
    unknown,
    {
      data: IGroupByOrder[];
      pageParam: number;
    },
    QueryKey
  >({
    queryKey: [`${screen}_group`],
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

  const renderBlockInfoOrder = (group: IOrderGroup) => {
    return (
      <Box sx={{ pl: 2, flex: 1 }}>
        <Typography variant="subtitle2">
          Bình bài: {group.group_name}
        </Typography>
      </Box>
    );
  };

  const listActionForPrinter = (group: IOrderGroup, idOrder: number) => {
    return (
      <OrderBtnDoneGroup
        idsOrder={[idOrder]}
        idGroup={group.id}
        groupName={group.group_name}
        groupType={group.group_type}
        refetch={refetch}
      />
    );
  };

  const listActionForWaitingApproved = (
    group: IOrderGroup[],
    idOrder: number
  ) => {
    const idGroup = group.map((e) => e.id);
    return (
      <>
        <OrderBtnRemoveGroup
          groupName={group[0].group_name}
          idGroup={idGroup}
          refetch={refetch}
        />
        <OrderBtnApproveGroup
          idsOrder={[idOrder]}
          idGroup={idGroup}
          groupName={group[0].group_name}
          refetch={refetch}
        />
      </>
    );
  };

  const listActionForStore = (
    group: IOrderGroup,
    idOrder: number,
    orderNo: string
  ) => {
    return (
      <OrderBtnStoreGroup
        idGroup={group.id}
        idsOrder={[idOrder]}
        refetch={refetch}
        groupType={group.group_type}
        orderNo={orderNo}
      />
    );
  };

  const renderHeader = (item: IGroupByOrder) => {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ pb: 1.5 }}
      >
        <Stack alignItems={"center"} direction={"row"}>
          <Label color="primary" sx={{ fontSize: 16, ml: 1 }}>
            {item.order_no} - {item.name}
          </Label>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          {/* {(roleStore || roleAdmin) &&
            screen === "PRINTED" &&
            listActionForStore(item.groups)}
          {(rolePrinter || roleAdmin) &&
            screen === "PRINTING" &&
            listActionForPrinter(item.groups)} */}
          {(rolePrinter || roleAdmin) &&
            screen === "WAITING_APPROVED" &&
            listActionForWaitingApproved(item.groups, item.id)}
        </Stack>
      </Stack>
    );
  };

  const dataGroup: IGroupByOrder[] = [];
  data?.pages?.forEach((paging) =>
    paging?.data?.forEach((cus) => {
      dataGroup.push(cus);
    })
  );

  const dataLoad = isInitialLoading ? [] : dataGroup;
  return (
    <Stack>
      {dataLoad.length > 0 ? (
        dataLoad.map((item, i) => {
          return (
            <Box
              key={item.id}
              ref={dataLoad.length === i + 1 ? ref : null}
              sx={{ my: 2 }}
            >
              {renderHeader(item)}
              <Divider sx={{ borderStyle: "dashed" }} />
              <OrderGroupDetail idOrder={item.id} />
              <Grid container spacing={2}>
                {item?.groups?.map((group) => {
                  return (
                    <Grid key={group.id} item xs={6} md={4}>
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
                        <Stack direction={"row"}>
                          {renderImageOrder(group?.images)}
                          {renderBlockInfoOrder(group)}
                        </Stack>
                        <Stack
                          direction={"row"}
                          spacing={1}
                          justifyContent={"flex-end"}
                        >
                          {(roleStore || roleAdmin) &&
                            screen === "PRINTED" &&
                            listActionForStore(group, item.id, item.order_no)}
                          {(rolePrinter || roleAdmin) &&
                            screen === "PRINTING" &&
                            listActionForPrinter(group, item.id)}
                          {/* {(rolePrinter || roleAdmin) &&
                            screen === "WAITING_APPROVED" &&
                            listActionForWaitingApproved(group, item.id)} */}
                        </Stack>
                        {/* {order?.outsources &&
                          renderRowOutSource(order.outsources)} */}
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

export default GroupListByOrder;
