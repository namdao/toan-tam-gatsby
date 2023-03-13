import React from "react";
import { navigate } from "gatsby";
import { m } from "framer-motion";
// @mui
import { Button, Typography } from "@mui/material";
// components
import MotionContainer from "components/animate/MotionLazyContainer";
// assets
import PageNotFoundIllustration from "assets/illustrations/PageNotFoundIllustration";
import { AuthSelector } from "scenes/auth/redux/slice";
import { useAppSelector } from "store";
import CompactLayout from "layouts/compactLayout";
import { PATH_AUTH } from "constant/routeConstant";
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
export default function Page404() {
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
    <CompactLayout>
      <header>
        <title>{translate("notfound")}</title>
      </header>

      <MotionContainer>
        <m.div variants={animatedIn}>
          <Typography variant="h3" paragraph>
            {translate("notfound")}
          </Typography>
        </m.div>

        <m.div variants={animatedIn}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button onClick={onNavigate} size="large" variant="contained">
          {translate("gotoHome")}
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
