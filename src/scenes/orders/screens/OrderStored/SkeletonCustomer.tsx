import { Card, Skeleton, Stack } from "@mui/material";
import React from "react";

const SkeletonCustomer = () => {
  return (
    <>
      {[0, 1, 2].map(() => (
        <Card sx={{ mt: 2 }}>
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
      ))}
    </>
  );
};

export default SkeletonCustomer;
