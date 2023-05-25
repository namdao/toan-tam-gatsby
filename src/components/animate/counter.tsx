import { Typography, TypographyProps } from "@mui/material";
import { animate } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { fNumber } from "utils/formatNumber";

const Counter = ({
  from,
  to,
  format,
  currency = "",
  ...rest
}: {
  from: number;
  to: number;
  currency?: string;
  format?: (val: number | string | null) => string;
} & TypographyProps) => {
  const nodeRef = useRef<{ textContent: number | string }>(null);

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 0.5,
      onUpdate(value) {
        if (node) {
          if (format) {
            node.textContent = value ? `${format(value)} ${currency}` : 0;
          } else {
            node.textContent = value ? `${fNumber(value)} ${currency}` : 0;
          }
        }
      },
    });

    return () => controls.stop();
  }, [from, to]);

  // @ts-ignore
  return <Typography component="span" ref={nodeRef} {...rest} />;
};
export default Counter;
