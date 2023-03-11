import React from "react";
import { m } from "framer-motion";
// @mui
import { Button, Typography } from "@mui/material";
// components
import MotionContainer from "components/animate/MotionLazyContainer";
// assets
import PageNotFoundIllustration from "assets/illustrations/PageNotFoundIllustration";
import { Link } from "gatsby";
import CompactLayout from "layouts/compactLayout";

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
  return (
    <CompactLayout>
      <header>
        <title> 404 Page Not Found</title>
      </header>

      <MotionContainer>
        <m.div variants={animatedIn}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>
        </m.div>

        <m.div variants={animatedIn}>
          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
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

        <Button href="/" size="large" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
