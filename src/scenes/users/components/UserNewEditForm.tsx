import React from "react";
import * as Yup from "yup";
import { useEffect, useMemo } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack } from "@mui/material";
// routes
import { PATH_APP } from "constant/routeConstant";
// assets
import { ROLES } from "scenes/users/helper/RoleConstants";
// components
import FormProvider, {
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
} from "components/hook-form";
import { useLocales } from "locales";
import {
  IReqUpdateUser,
  IResUser,
  IStatusUser,
} from "scenes/users/redux/types";
import { useUserList } from "scenes/users/hooks/useUserList";
import { navigate } from "gatsby";

interface FormValuesProps {
  first_name?: string;
  last_name?: string;
  id: number;
  role_name?: string;
  username: string;
  password?: string;
  email: string;
  status: boolean;
}

type Props = {
  isEdit?: boolean;
  currentUser?: IResUser;
  closeModal?: () => void;
  onGetUserList?: () => void;
};

export default function UserNewEditForm({
  isEdit = false,
  currentUser,
  closeModal,
  onGetUserList,
}: Props) {
  const { onUpdateUser, onAddUser } = useUserList();
  const { translate } = useLocales();
  const NewUserSchema = Yup.object().shape({
    first_name: Yup.string().required("Nhập họ"),
    email: Yup.string()
      .required("Nhập email")
      .email("Email không đúng định dạng"),
    last_name: Yup.string().required("Nhập tên"),
    role_name: Yup.string().required("Chọn quyền"),
    username: Yup.string().required("Nhập username"),
    password: !isEdit ? Yup.string().required("Nhập Mật khẩu") : Yup.string(),
    status: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id,
      first_name: currentUser?.first_name,
      last_name: currentUser?.last_name,
      email: currentUser?.email,
      role_name: currentUser?.roles[0].name,
      username: currentUser?.username,
      status: currentUser?.status === IStatusUser.ACTIVE ? true : false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentUser]);

  const onSubmit = async (data: FormValuesProps) => {
    const payload: IReqUpdateUser = {
      ...data,
      status: data.status ? IStatusUser.ACTIVE : IStatusUser.INACTIVE,
    };
    if (isEdit) {
      const result = await onUpdateUser(data.id, payload);
      if (result) {
        reset();
        onGetUserList && onGetUserList();
        closeModal && closeModal();
      }
    } else {
      const result = await onAddUser(payload);
      if (result) {
        navigate(PATH_APP.user.list);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField
                name="first_name"
                label={translate("users.userUpdate.form.firstName")}
              />
              <RHFTextField
                name="last_name"
                label={translate("users.userUpdate.form.lastName")}
              />
              <RHFTextField
                name="email"
                disabled={isEdit}
                label={translate("users.userUpdate.form.email")}
              />
              <RHFTextField
                name="username"
                disabled={isEdit}
                label={translate("users.userUpdate.form.userName")}
              />
              <RHFTextField
                name="password"
                label={translate("users.userUpdate.form.password")}
              />

              <RHFSelect
                native
                name="role_name"
                label={translate("users.userUpdate.form.roles")}
                placeholder={translate("users.userUpdate.form.roles")}
              >
                <option value="">Chọn quyền</option>
                {Object.keys(ROLES).map((key) => (
                  <option key={key} value={key}>
                    {ROLES[key as keyof typeof ROLES]}
                  </option>
                ))}
              </RHFSelect>
              <RHFCheckbox name="status" label="Kích hoạt" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!isEdit
                  ? translate("users.userUpdate.form.create")
                  : translate("users.userUpdate.form.update")}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
