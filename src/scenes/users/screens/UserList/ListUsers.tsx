import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useUserList } from "scenes/users/hooks/useUserList";
import UserCard from "./UserCard";

const ListUsers = () => {
  const { onGetUserList, loading, userList } = useUserList();
  useEffect(() => {
    onGetUserList();
  }, []);
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      }}
    >
      {userList.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </Box>
  );
};
export default ListUsers;
