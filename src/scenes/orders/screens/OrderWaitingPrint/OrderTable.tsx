import React, {
  createRef,
  useEffect,
  useImperativeHandle,
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
  GridRowId,
} from "@mui/x-data-grid-pro";
import {
  OrderWaitingTableColumns,
  pinOrderLeft,
  fieldStored,
} from "scenes/orders/helper/OrderWaitingTableColumns";
import { IOrder, IOrderDetail } from "scenes/orders/redux/types";
import { useOrderWaitingPrint } from "scenes/orders/hooks/useOrderWaitingPrint";
import { useAppSelector } from "store";
import { AuthSelector } from "scenes/auth/redux/slice";
import {
  addTableColumn,
  getTableColumn,
  OrderFeature,
} from "services/firebase/common";
import { IPaperTabs, PAPER_TABS } from "scenes/papers/helper/PaperConstant";
import { Tab, Tabs } from "@mui/material";
import Label from "components/label";

const MemoizedRow = React.memo(GridRow);

const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
type IMagicTableRef = {
  refreshList: () => void;
  onSearching: (search: string) => void;
};

export const magicTableWaitingRef = createRef<IMagicTableRef>();
type IPropsOrderTable = {
  onSelectOrder: (val: IOrderDetail[]) => void;
  onTabChange?: () => void;
  listTotalSelection?: IOrderDetail[];
  printTypeName?: string;
};
const OrderTable: React.FC<IPropsOrderTable> = ({
  onSelectOrder,
  onTabChange,
  listTotalSelection,
  printTypeName,
}) => {
  const [tabSelected, setSelectedTab] = useState<IPaperTabs>(PAPER_TABS[0]);
  const [tabTotals, setTabTotals] = useState<Record<string, number>>({});
  const [displayTotal, setDisplayTotal] = useState<number>(0);
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
  const {
    onGetOrderPaperOrCategory,
    onOrderWithPaperIds,
    onNextPage,
    setPageModel,
    total,
    orderList,
    pageModel,
    loading,
    paperTypeCounts,
  } = useOrderWaitingPrint(tabSelected, printTypeName);

  // Use batch counts from API instead of individual tab fetches
  useEffect(() => {
    if (Object.keys(paperTypeCounts).length > 0) {
      setTabTotals(paperTypeCounts);
    }
  }, [paperTypeCounts]);

  // Update display total: use batch counts from API
  useEffect(() => {
    if (loading) {
      // While loading, show cached value if available
      const cached = tabTotals[tabSelected.value];
      if (cached !== undefined && cached > 0) {
        setDisplayTotal(cached);
      }
    } else {
      // When not loading, use batch counts
      const count = tabTotals[tabSelected.value];
      setDisplayTotal(count ?? 0);
    }
  }, [loading, tabSelected.value, tabTotals]);

  useEffect(() => {
    onGetOrderPaperOrCategory();
    onTabChange && onTabChange();
  }, [tabSelected, printTypeName]);
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
    onSearching: (search: string) =>
      onOrderWithPaperIds(
        {
          page: 0,
          pageSize: 20,
        },
        search
      ),
  }));

  const setPagination = (model: GridPaginationModel) => {
    // DataGridPro may emit an initial onPaginationModelChange on mount/prop sync.
    // Guard to avoid duplicate fetches (and potential update loops) when nothing changed.
    if (model.page === pageModel.page && model.pageSize === pageModel.pageSize) {
      return;
    }
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
    onSelectOrder(selectedRowData);
    setSelectionModel(ids);
  };

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
        {PAPER_TABS.map((tab) => (
          <Tab
            key={tab.value}
            value={tab}
            label={tab.label}
            icon={
              <Label sx={{ mr: 1 }}>
                {tabSelected.value === tab.value ? displayTotal : tabTotals[tab.value] ?? 0}
              </Label>
            }
          />
        ))}
      </Tabs>
      <Box sx={{ height: "100vh", width: "100%" }}>
        <DataGridPro
          rows={orderList}
          rowCount={total}
          loading={loading}
          checkboxSelection
          columns={OrderWaitingTableColumns}
          onRowSelectionModelChange={onRowSelect}
          columnVisibilityModel={storedColumn}
          onColumnVisibilityModelChange={onChangeColumn}
          initialState={{
            pinnedColumns: {
              left: pinOrderLeft,
            },
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
