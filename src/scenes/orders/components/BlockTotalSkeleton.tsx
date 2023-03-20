import { Skeleton, Stack } from "@mui/material";
import React, { FC } from "react";

export type IPropsSkeleton = {
  color: string;
};
const BlockTotalSkeleton: FC<IPropsSkeleton> = ({ color }) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="center"
    sx={{ width: 1, minWidth: 200 }}
  >
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ position: "relative" }}
    >
      <Skeleton
        sx={{ bgcolor: color, ml: 3 }}
        variant="circular"
        width={56}
        height={56}
      />
    </Stack>
    <Stack spacing={2} sx={{ ml: 3 }}>
      <Skeleton
        sx={{ mt: 1, bgcolor: color }}
        variant="rectangular"
        width={80}
        height={10}
      />
      <Skeleton
        variant="rectangular"
        width={80}
        height={10}
        sx={{ bgcolor: color }}
      />
    </Stack>
  </Stack>
);
export default BlockTotalSkeleton;
