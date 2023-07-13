import { Container } from "@mui/material";
import { HistoryLocation } from "@reach/router";
import { parseInt } from "lodash";
import React, { FC } from "react";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import TableListDebitDetail from "./TableListDebitDetail";

type Props = {
  company_id: string;
  location: HistoryLocation;
};
const DebitCompanyDetail: FC<Props> = ({ location, company_id }) => {
  const params = new URLSearchParams(location.search);
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);

  const titleCompany = params.get("company") || "";
  const totalDebit = parseInt(params.get("total_debit") || "0");
  const totalPaid = parseInt(params.get("total_paid") || "0");
  const delta = parseInt(params.get("delta") || "0");
  const companyId = parseInt(company_id);
  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      <Header title={titleCompany} />
      <TableListDebitDetail
        companyId={companyId}
        totalDebit={totalDebit}
        totalPaid={totalPaid}
        delta={delta}
      />
    </Container>
  );
};
export default DebitCompanyDetail;
