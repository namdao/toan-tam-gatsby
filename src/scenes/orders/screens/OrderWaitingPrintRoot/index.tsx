import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { PATH_APP } from "constant/routeConstant";

const OrderWaitingPrintRoot = () => {
  useEffect(() => {
    navigate(PATH_APP.order.waitingPrintKts);
  }, []);

  return <></>;
};

export default OrderWaitingPrintRoot;
