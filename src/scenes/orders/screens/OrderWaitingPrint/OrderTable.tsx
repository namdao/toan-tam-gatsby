import React, {
  createRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRow,
  GridColumnHeaders,
  GridPaginationModel,
  GridColumnVisibilityModel,
  GridRowSelectionModel,
  useGridApiRef,
  GridRowId,
} from "@mui/x-data-grid-pro";
import {
  OrderWaitingTableColumns,
  pinOrderLeft,
  fieldStored,
} from "scenes/orders/helper/OrderWaitingTableColumns";
import { IOrder, IOrderDetail } from "scenes/orders/redux/types";
import {
  IPage,
  useOrderWaitingPrint,
} from "scenes/orders/hooks/useOrderWaitingPrint";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import {
  addTableColumn,
  getTableColumn,
  OrderFeature,
} from "services/firebase/common";
import { IPropsGroup } from "./OrderCreateGroup";
import { IPaperTabs, PAPER_TABS } from "scenes/papers/helper/PaperConstant";
import { Tab, Tabs } from "@mui/material";

const tabChild = (tab: IPaperTabs) => {
  return <Tab key={tab.value} value={tab} label={tab.label} />;
};
const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
type IMagicTableRef = {
  refreshList: () => void;
};

export const magicTableWaitingRef = createRef<IMagicTableRef>();
type IPropsOrderTable = {
  onSelectOrder: (val: IOrderDetail[]) => void;
  onTabChange?: () => void;
  listTotalSelection?: IOrderDetail[];
};
const OrderTable: React.FC<IPropsOrderTable> = ({
  onSelectOrder,
  onTabChange,
  listTotalSelection,
}) => {
  const [tabSelected, setSelectedTab] = useState<IPaperTabs>(PAPER_TABS[0]);
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
  const {
    onGetOrderPaperOrCategory,
    onNextPage,
    setPageModel,
    total,
    orderList,
    pageModel,
  } = useOrderWaitingPrint(tabSelected);
  useEffect(() => {
    onGetOrderPaperOrCategory();
    onTabChange && onTabChange();
  }, [tabSelected]);
  const onChangeTab = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: IPaperTabs
  ) => {
    setPageModel({
      page: 0,
      pageSize: 20,
    });
    // setSelectionModel([]);
    setSelectedTab(newValue);
  };
  const [storedColumn, setStoredColumn] = useState<Record<string, boolean>>({});
  const currentUser = useAppSelector(AuthSelector.getProfile);
  useEffect(() => {
    const getColumn = async () => {
      const columnStored = await getTableColumn({
        type: OrderFeature.WAITING_PRINT,
        user: currentUser.userName,
      });
      setStoredColumn(columnStored);
    };
    getColumn();
  }, []);

  useEffect(() => {
    if (Array.isArray(listTotalSelection)) {
      setSelectionModel(listTotalSelection.map((e) => e.id));
    }
  }, [listTotalSelection]);

  const onResetList = () => {
    onGetOrderPaperOrCategory();
    setPageModel({
      page: 0,
      pageSize: 20,
    });
    setSelectionModel([]);
  };
  useImperativeHandle(magicTableWaitingRef, () => ({
    refreshList: onResetList,
  }));

  const setPagination = (model: GridPaginationModel) => {
    onNextPage(model.page, model.pageSize);
  };

  const onChangeColumn = async (params: GridColumnVisibilityModel) => {
    const listParamsStore = {
      ...fieldStored,
      ...params,
    };
    await addTableColumn({
      typeStored: OrderFeature.WAITING_PRINT,
      dataColumn: listParamsStore,
      user: currentUser.userName,
    });
    setStoredColumn(listParamsStore);
  };

  const onRowSelect = (ids: GridRowSelectionModel) => {
    const selectedIDs = new Set(ids);
    const selectedRowData = orderList.filter((row) => selectedIDs.has(row.id));
    console.log(selectedRowData);
    onSelectOrder(selectedRowData);
    setSelectionModel(ids);
  };

  console.log("render");
  return (
    <>
      <Tabs
        value={tabSelected}
        onChange={onChangeTab}
        sx={{
          px: 2,
          bgcolor: "background.neutral",
        }}
      >
        {PAPER_TABS.map((tab) => tabChild(tab))}
      </Tabs>
      <Box sx={{ height: "100vh", width: "100%" }}>
        <DataGridPro
          rows={orderList}
          rowCount={total}
          checkboxSelection
          columns={OrderWaitingTableColumns}
          onRowSelectionModelChange={onRowSelect}
          columnVisibilityModel={storedColumn}
          onColumnVisibilityModelChange={onChangeColumn}
          initialState={{
            pinnedColumns: {
              left: pinOrderLeft,
            },
            pagination: { paginationModel: pageModel },
          }}
          pageSizeOptions={[20, 50, 100]}
          components={{
            Row: MemoizedRow,
            ColumnHeaders: MemoizedColumnHeaders,
          }}
          pagination
          paginationModel={pageModel}
          paginationMode="server"
          onPaginationModelChange={setPagination}
          rowSelectionModel={selectionModel}
          keepNonExistentRowsSelected
        />
      </Box>
    </>
  );
};
export default OrderTable;
