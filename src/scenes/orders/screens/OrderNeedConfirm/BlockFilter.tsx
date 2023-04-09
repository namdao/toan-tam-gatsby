import React, { SyntheticEvent } from "react";
import { Stack, TextField, Button, Autocomplete } from "@mui/material";
import Iconify from "components/iconify";
import { useLocales } from "locales";
import { useAppSelector } from "store";
import { customerSelector } from "scenes/customer/redux/slice";

type IProps = {
  setCustomer: (val: ISelectCustomer | null) => void;
  customer: ISelectCustomer | null;
};
export type ISelectCustomer = {
  id: number;
  label: string;
};
export default function BlockFilter({ customer, setCustomer }: IProps) {
  const { translate } = useLocales();
  const customerList = useAppSelector(customerSelector.getCustomerList);

  const onResetFilter = () => {
    setCustomer(null);
  };

  const onCustomerChange = (
    _e: SyntheticEvent<any>,
    value: ISelectCustomer | null
  ) => {
    setCustomer(value || null);
  };
  const customerAutoComplate = customerList.map((e) => {
    return { id: e.id, label: `${e.name} (${e.company?.company_name})` };
  });
  const isFiltered = customer;
  return (
    <Stack
      display="block"
      spacing={2}
      alignItems="center"
      direction={{
        xs: "column",
        md: "row",
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <Autocomplete
        disablePortal
        autoHighlight
        onChange={onCustomerChange}
        value={customer}
        options={customerAutoComplate}
        sx={{ width: "30%" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={translate("orders.orderNeedCollect.filterCustomer")}
          />
        )}
      />
      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          {translate("orders.delete")}
        </Button>
      )}
    </Stack>
  );
}
