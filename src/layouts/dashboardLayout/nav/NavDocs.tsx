import React from "react";
// @mui
import { Stack, Button, Typography, Box } from "@mui/material";
import { useAppSelector } from "store";
import Svg from "utils/svg";
import { PATH_APP } from "constant/routeConstant";
import { AuthSelector } from "scenes/auth/redux/slice";
import { useLocales } from "locales";

// ----------------------------------------------------------------------

export default function NavDocs() {
  const user = useAppSelector(AuthSelector.getProfile);

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
          {`${translate("docs.hi")}, ${user?.userName}`}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", whiteSpace: "pre-line" }}
        >
          {`${translate("docs.description")}`}
        </Typography>
      </div>

      <Button
        href={PATH_APP.root}
        target="_blank"
        rel="noopener"
        variant="contained"
      >
        {`${translate("docs.documentation")}`}
      </Button>
    </Stack>
  );
}
