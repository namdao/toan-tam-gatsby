import React from "react";
import { Typography, Stack } from "@mui/material";
// components
import Logo from "components/logo";
import Image from "components/image";
import {
  StyledRoot,
  StyledSectionBg,
  StyledSection,
  StyledContent,
} from "./styles";
import Images from "utils/images";
import { useAppSelector } from "store";
import { SettingsSelector } from "services/settings/redux/slice";
import { useLocales } from "locales";

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, title }: Props) {
  const themeMode = useAppSelector(SettingsSelector.getThemeMode);
  const { translate } = useLocales();
  return (
    <StyledRoot>
      {/* <Logo
        sx={{
          zIndex: 9,
          position: "absolute",
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      /> */}

      <StyledSection>
        {/* <Typography
          variant="h3"
          sx={{ mb: 10, maxWidth: 480, textAlign: "center" }}
        >
          {translate("wellcomeCompany")}
        </Typography> */}

        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={themeMode === "light" ? Images.bgLogin : Images.bgLoginDark}
          sx={{ maxWidth: 720 }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
