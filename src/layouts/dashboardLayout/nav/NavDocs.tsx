import React from "react";
// @mui
import { Stack, Button, Typography, Box } from "@mui/material";
import { useAppSelector } from "store";
import Svg from "utils/svg";
import { AuthSelector } from "scenes/auth/redux/slice";
import { useLocales } from "locales";
import useAuth from "scenes/auth/hooks/useAuth";

// ----------------------------------------------------------------------

export default function NavDocs() {
  const user = useAppSelector(AuthSelector.getProfile);
  const { onSignOut } = useAuth();
  const { translate } = useLocales();

  return (
    <Stack
      spacing={3}
      sx={{
        px: 5,
        pb: 5,
        mt: 10,
        width: 1,
        display: "block",
        textAlign: "center",
      }}
    >
      <Box component="img" src={Svg.illustration.illustrationDocs} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          {`${translate("hi")}, ${user?.userName}`}
        </Typography>
      </div>

      <Button variant="contained" onClick={onSignOut}>
        {`${translate("logout")}`}
      </Button>
    </Stack>
  );
}
