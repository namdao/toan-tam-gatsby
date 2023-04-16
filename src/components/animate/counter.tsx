import { Typography, TypographyProps } from "@mui/material";
import { animate } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { fCurrency } from "utils/formatNumber";

const Counter = ({
  from,
  to,
  ...rest
}: {
  from: number;
  to: number;
} & TypographyProps) => {
  const nodeRef = useRef<{ textContent: number | string }>(null);

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 0.5,
      onUpdate(value) {
        if (node && node?.textContent) {
          node.textContent = value ? fCurrency(value.toFixed(2)) : 0;
        }
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <Typography component="span" ref={nodeRef} {...rest} />;
};
export default Counter;
