import { Box, Button, Stack } from "@mui/material";
import { useLocales } from "locales";
import React from "react";

const BlockPrintAndSendEmail = () => {
  const { translate } = useLocales();
  return (
    <Stack direction="row" spacing={3}>
      <Button variant="outlined">
        {translate("orders.orderNeedCollect.debit")}
      </Button>
      <Button variant="outlined">
        {translate("orders.orderNeedCollect.emailDebit")}
      </Button>
      <Box></Box>
    </Stack>
  );
};
export default BlockPrintAndSendEmail;
