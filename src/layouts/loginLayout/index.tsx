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

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children }: Props) {
  const themeMode = useAppSelector(SettingsSelector.getThemeMode);
  return (
    <StyledRoot>
      <StyledSection>
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
