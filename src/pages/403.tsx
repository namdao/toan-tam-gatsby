import React from "react";
import { navigate } from "gatsby";
import { m } from "framer-motion";
// @mui
import { Box, Button, Typography } from "@mui/material";
// components
import MotionLazyContainer from "components/animate/MotionLazyContainer";
// assets
import { AuthSelector } from "scenes/auth/redux/slice";
import { useAppSelector } from "store";
import CompactLayout from "layouts/compactLayout";
import { PATH_AUTH } from "constant/routeConstant";
import ForbiddenIllustration from "assets/illustrations/ForbiddenIllustration";
import { useLocales } from "locales";

const animatedIn = {
  animate: {
    scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
    opacity: [0, 1, 1, 1, 1, 1],
    transition: { durationIn: 0.5, easeIn: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: {
    scale: [0.9, 1.1, 0.3],
    opacity: [1, 1, 0],
  },
};
export default function Page403() {
  const token = useAppSelector(AuthSelector.getToken);
  const { translate } = useLocales();
  const onNavigate = () => {
    if (token) {
      navigate("/");
    } else {
      navigate(PATH_AUTH.login);
    }
  };
  return (
    <>
      <header>
        <title>{translate("permissionDenied")}</title>
      </header>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <MotionLazyContainer>
          <m.div variants={animatedIn}>
            <Typography variant="h3" paragraph>
              {translate("permissionDenied")}
            </Typography>
          </m.div>
          <m.div variants={animatedIn}>
            <ForbiddenIllustration
              sx={{ height: "auto", my: { xs: 5, sm: 10 } }}
            />
          </m.div>
          <Button onClick={onNavigate} size="large" variant="contained">
            {translate("gotoHome")}
          </Button>
        </MotionLazyContainer>
      </Box>
    </>
  );
}
