import { Skeleton, Stack, Box, Grid, Card } from "@mui/material";
import React from "react";

const BlockSkeleton = (): JSX.Element => (
  <Stack direction="row" spacing={2}>
    <Skeleton variant="circular" width={24} height={24} />
    <Skeleton variant="rectangular" width="100%" height={20} />
  </Stack>
);

export const BlockInfoCustomerSkeleton = () => (
  <Grid item xs={12} md={5}>
    <Card>
      <Skeleton variant="rectangular" sx={{ mx: 3, mt: 3 }}></Skeleton>
      <Stack spacing={2} sx={{ p: 3 }}>
        {[0, 1, 2, 3].map((value) => (
          <BlockSkeleton key={value} />
        ))}
      </Stack>
      <Stack sx={{ pt: 5 }}></Stack>
    </Card>
  </Grid>
);
export const BlockInfoDeliverySekelton = () => (
  <Grid item xs={12} md={7}>
    <Card>
      <Skeleton variant="rectangular" sx={{ mx: 3, mt: 3 }}></Skeleton>
      <Stack spacing={2} sx={{ p: 3 }}>
        {[0, 1, 2, 3, 4].map((value) => (
          <BlockSkeleton key={value} />
        ))}
      </Stack>
    </Card>
  </Grid>
);

export const BlockInfoOrderSkelekton = () => (
  <Grid item xs={12} md={12}>
    <Card>
      <Skeleton variant="rectangular" sx={{ mx: 3, mt: 3 }}></Skeleton>
      <Stack spacing={2} sx={{ p: 3 }}>
        {[0, 1, 2].map((value) => (
          <BlockSkeleton key={value} />
        ))}
      </Stack>
    </Card>
  </Grid>
);

export const BlockUpdateOrderSkeleton = () => (
  <Grid item xs={12} md={12}>
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        {[0, 1, 2].map((value) => (
          <Skeleton
            key={value}
            variant="rectangular"
            width="100%"
            height={20}
          />
        ))}
      </Stack>
    </Card>
  </Grid>
);
