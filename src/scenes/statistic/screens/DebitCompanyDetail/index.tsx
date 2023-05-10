import { HistoryLocation, LocationProps } from "@reach/router";
import React, { FC } from "react";
import Header from "./BlockHeader";

type Props = {
  company_id: string;
  location: HistoryLocation;
};
const DebitCompanyDetail: FC<Props> = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const titleCompany = params.get("company") || "";
  return <Header title={titleCompany} />;
};
export default DebitCompanyDetail;
