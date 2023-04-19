import { Box, LinearProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUserList } from "scenes/users/hooks/useUserList";
import { IResUser } from "scenes/users/redux/types";
import DialogUserUpdateSelect from "./DialogUserUpdateSelect";
import UserCard from "./UserCard";

const ListUsers = () => {
  const { onGetUserList, loading, userList } = useUserList();
  const [currentUser, setCurrentUser] = useState<IResUser>({} as IResUser);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    onGetUserList();
  }, []);

  const handleClose = () => setOpen(false);
  const handleOpen = (user: IResUser) => {
    setCurrentUser(user);
    setOpen(true);
  };
  if (loading) {
    return (
      <Box sx={{ margin: "10% auto", width: "50%" }}>
        <LinearProgress color="primary" />
      </Box>
    );
  }

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
        <UserCard key={index} user={user} openUser={handleOpen} />
      ))}
      <DialogUserUpdateSelect
        currentUser={currentUser}
        open={open}
        handleClose={handleClose}
        onGetUserList={onGetUserList}
      />
    </Box>
  );
};
export default ListUsers;
