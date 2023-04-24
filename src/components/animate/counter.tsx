import { Typography, TypographyProps } from "@mui/material";
import { animate } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { fCurrency } from "utils/formatNumber";

const Counter = ({
  from,
  to,
  format,
  ...rest
}: {
  from: number;
  to: number;
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
            node.textContent = value ? format(value.toFixed(2)) : 0;
          } else {
            node.textContent = value ? fCurrency(value.toFixed(2)) : 0;
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