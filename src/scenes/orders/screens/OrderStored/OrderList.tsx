import React, { useEffect, useRef, useState } from "react";
import {
  Tab,
  Tabs,
  Card,
  Stack,
  CircularProgress,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import {
  ORDER_STATUS_NAME,
  ORDER_TAB_STORED,
} from "scenes/orders/helper/OrderConstant";
import { useLocales } from "locales";
import Label from "components/label";
import { IOrderTabProcessing } from "scenes/orders/helper/OrderConstant";
import OrderTable from "./OrderTable";
import BlockButtonAction, { IPropsDeliveryPrint } from "./BlockButtonAction";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import useOrderByCustomer, {
  IOrderByCustomer,
} from "scenes/orders/hooks/useOrderByCustomer";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import SkeletonCustomer from "./SkeletonCustomer";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";

const tabChild = (tab: IOrderTabProcessing) => {
  const { translate } = useLocales();

  return <Tab key={tab.value} value={tab.value} label={translate(tab.name)} />;
};
const OrderList = () => {
  const listButtonRef = useRef<Record<number, IPropsDeliveryPrint | null>>({});
  const [filterStatus, handleFilterStatus] = useState<ORDER_STATUS_NAME>(
    ORDER_STATUS_NAME.STORED
  );

  const queryClient = useQueryClient();
  const prevStatus = useRef(filterStatus);
  const { getCustomerInfinity } = useOrderByCustomer(filterStatus);
  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  const onChangeStatus = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: ORDER_STATUS_NAME
  ) => {
    handleFilterStatus(newValue);
  };

  const onHandleBtnDelivery = ({
    isValid,
    listIds,
    idCus,
  }: {
    isValid: boolean;
    listIds?: GridRowSelectionModel;
    idCus: number;
  }) => {
    if (!isValid) {
      listButtonRef?.current?.[idCus]?.disablePrintDelivery();
      listButtonRef?.current?.[idCus]?.disablePrintDeliveryV2();
      if (filterStatus === ORDER_STATUS_NAME.STORED) {
        listButtonRef?.current?.[idCus]?.disableBtnDelivery();
      }
      if (filterStatus === ORDER_STATUS_NAME.DELIVER) {
        listButtonRef?.current?.[idCus]?.disableBtnDone();
      }
    } else {
      listButtonRef?.current?.[idCus]?.enablePrintDelivery();
      listButtonRef?.current?.[idCus]?.enablePrintDeliveryV2();
      if (filterStatus === ORDER_STATUS_NAME.STORED) {
        listButtonRef?.current?.[idCus]?.enableBtnDelivery();
      }
      if (filterStatus === ORDER_STATUS_NAME.DELIVER) {
        listButtonRef?.current?.[idCus]?.enableBtnDone();
      }
      listButtonRef?.current?.[idCus]?.setListIds(listIds as number[]);
    }
  };

  const setRef = (element: IPropsDeliveryPrint | null, key: number) => {
    listButtonRef.current[key] = element;
  };

  const fetchCustomerInfinity = ({ pageParam = 1 }) => {
    return getCustomerInfinity(pageParam, filterStatus);
  };

  const {
    fetchNextPage,
    data,
    refetch,
    isInitialLoading,
    isFetching,
    isRefetching,
  } = useInfiniteQuery<
    {
      data: IOrderByCustomer[];
      pageParam: number;
    },
    any,
    {
      data: IOrderByCustomer[];
      pageParam: number;
    }
  >({
    queryKey: ["orderStored"],
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    queryFn: fetchCustomerInfinity,
    getNextPageParam: (lastPage) => {
      return lastPage.pageParam > -1 ? lastPage.pageParam : undefined;
    },
  });
  useEffect(() => {
    if (inView && prevStatus.current === filterStatus) {
      fetchNextPage();
    } else if (prevStatus.current !== filterStatus) {
      prevStatus.current = filterStatus;
      refetch();
    }
  }, [inView, filterStatus]);

  const refetchList = () => {
    queryClient.setQueryData<{
      pages: [
        {
          data: IOrderByCustomer[];
          pageParam: number;
        }
      ];
    }>(["orderStored"], (oldData) => ({
      pageParams: [1],
      pages: [
        {
          data: [],
          pageParam: 1,
        },
      ],
    }));
    refetch({ refetchPage: (page, index) => index === 0 });
  };
  const dataMerge: IOrderByCustomer[] = [];
  data?.pages?.forEach((paging) =>
    paging?.data?.forEach((cus) => {
      dataMerge.push(cus);
    })
  );

  const dataLoad = isInitialLoading || isRefetching ? [] : dataMerge;
  return (
    <Stack>
      <Stack alignItems={"flex-end"}>
        <IconButton
          // variant="contained"
          onClick={refetchList}
          sx={{
            width: 48,
            height: 48,
            my: 1,
            backgroundColor: (theme) => theme.palette.primary.lighter,
          }}
        >
          <Iconify
            icon="solar:refresh-outline"
            color={(theme) => theme.palette.primary.main}
            width={24}
          />
        </IconButton>
      </Stack>
      <Tabs
        value={filterStatus}
        onChange={onChangeStatus}
        sx={{
          px: 2,
          bgcolor: "background.neutral",
        }}
      >
        {ORDER_TAB_STORED.map((tab) => tabChild(tab))}
      </Tabs>
      {dataLoad.length > 0 ? (
        dataLoad.map((cus, i) => {
          return (
            <Card
              ref={dataMerge.length === i + 1 ? ref : null}
              sx={{ mt: 2, mb: 2 }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2.5, py: 3 }}
              >
                {/* <BlockFilter /> */}
                <Label color="primary" sx={{ fontSize: 16 }}>
                  {cus?.customer?.name} : {cus?.customer?.phone}
                </Label>
                <BlockButtonAction
                  status={filterStatus}
                  ref={(el) => setRef(el, cus.customer.id)}
                  onRefreshList={refetch}
                />
              </Stack>
              <OrderTable
                idCus={cus.customer.id}
                status={filterStatus}
                orders={cus.listOrder}
                callbackBtnPrint={onHandleBtnDelivery}
              />
            </Card>
          );
        })
      ) : isInitialLoading || isRefetching ? (
        <SkeletonCustomer />
      ) : (
        <Card sx={{ mt: 2, mb: 2, p: 3 }}>
          <Label color="warning">
            {filterStatus === ORDER_STATUS_NAME.DELIVER
              ? "Không có khách hàng cần giao"
              : "Không có khách hàng nào có đơn hàng lưu kho"}{" "}
          </Label>
        </Card>
      )}
      {isFetching && dataLoad.length > 0 && (
        <Stack alignItems="center" sx={{ mt: 2 }}>
          <CircularProgress />
        </Stack>
      )}
    </Stack>
  );
};

export default OrderList;
