import React from "react";
import { Container, Divider } from "@mui/material";
import { useLocales } from "locales";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";
import Header from "./BlockHeader";
import ListUsers from "./ListUsers";
import Helmet from "react-helmet";

const UserList = () => {
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const { translate } = useLocales();
  return (
    <>
      <Helmet title={translate("users.userList.title")} />
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Header />
        <ListUsers />
        <Divider />
      </Container>
    </>
  );
};
export default UserList;
