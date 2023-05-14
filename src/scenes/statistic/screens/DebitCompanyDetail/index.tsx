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
  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      <Header title={titleCompany} />
      <TableListDebitDetail company_id={parseInt(company_id)} />
    </Container>
  );
};
export default DebitCompanyDetail;
