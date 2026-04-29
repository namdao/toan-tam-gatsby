import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { apiGetGroupsByOrder } from "scenes/orders/redux/api";
import { ISimpleGroup } from "scenes/orders/redux/types";
import ProductionProcessPanel from "scenes/orders/screens/OrderListGroup/ProductionProcessPanel";
import Label from "components/label";

type IProps = {
  orderId: number;
};

const BlockProductionProcesses: React.FC<IProps> = ({ orderId }) => {
  const [groups, setGroups] = useState<ISimpleGroup[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiGetGroupsByOrder(orderId)
      .then((res) => {
        if (res?.data?.groups) {
          setGroups(res.data.groups);
        }
      })
      .catch((err) => console.error("Failed to load groups for order", err))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <Stack alignItems="center" sx={{ py: 2 }}>
        <CircularProgress size={24} />
      </Stack>
    );
  }

  if (groups.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Stack spacing={1}>
        {groups.map((group) => (
          <Box key={group.id}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 0.5 }}
            >
              {/*<Label color="primary">
                {group.group_name || `Nhóm #${group.id}`}
              </Label>
              {group.group_no && (
                <Typography variant="caption" color="text.secondary">
                  {group.group_no}
                </Typography>
              )}*/}
            </Stack>
            <ProductionProcessPanel groupId={group.id} canEdit={false} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default BlockProductionProcesses;
