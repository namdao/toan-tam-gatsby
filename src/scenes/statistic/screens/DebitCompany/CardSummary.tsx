import { alpha, Card, CardProps, Typography, useTheme } from "@mui/material";
import Iconify from "components/iconify";
import React from "react";
import { ColorSchema } from "theme/palette";
import { fNumber, fShortenNumber } from "utils/formatNumber";
import { bgGradient } from "utils/cssStyles";
import Counter from "components/animate/counter";

interface Props extends CardProps {
  title: string;
  total: number;
  icon: string;
  color?: ColorSchema;
}

export default function CardSummary({
  title,
  total,
  icon,
  color = "primary",
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        color: theme.palette[color].darker,
        bgcolor: theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <Iconify
        icon={icon}
        sx={{
          mb: 3,
          p: 2.5,
          width: 64,
          height: 64,
          borderRadius: "50%",
          color: theme.palette[color].dark,
          ...bgGradient({
            direction: "135deg",
            startColor: `${alpha(theme.palette[color].dark, 0)} 0%`,
            endColor: `${alpha(theme.palette[color].dark, 0.24)} 100%`,
          }),
        }}
      />

      <Typography variant="h3">{fShortenNumber(total)}</Typography>
      <Counter
        from={1}
        to={total}
        format={fNumber}
        variant="h6"
        currency="VNĐ"
      />
      <Typography variant="subtitle2" sx={{ opacity: 0.64 }}>
        {title}
      </Typography>
    </Card>
  );
}
