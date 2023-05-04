import React from "react";
import * as Yup from "yup";
import { useEffect, useMemo } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
import { Box, Card, createFilterOptions, Grid, Stack } from "@mui/material";
// routes
import { PATH_APP } from "constant/routeConstant";
// assets
import { ROLES } from "scenes/users/helper/RoleConstants";
// components
import FormProvider, {
  RHFAutocomplete,
  RHFSelect,
  RHFTextField,
} from "components/hook-form";
import { useLocales } from "locales";
import { navigate } from "gatsby";
import { ICompany } from "constant/commonType";
import { useCompany } from "../hooks/useCompany";
import { useAppSelector } from "store";
import {
  CitySelector,
  IDistrict,
  IWard,
} from "services/settings/redux/city.slice";
import { IResCityDistrictWard } from "services/settings/redux/types";
import { magicTableRef } from "../screens/CompanyList/CompanyTable";

interface FormValuesProps {
  id?: number;
  district?: string;
  districtSelect: IDistrict;
  wards?: string;
  wardSelect: IWard;
  citySelect: IResCityDistrictWard;
  city?: string;
  tax_code?: string;
  company_name: string;
  email?: string;
  accountant_email?: string;
  phone?: string;
  address?: string;
}

type Props = {
  isEdit?: boolean;
  company?: ICompany;
  closeModal?: () => void;
};
const filter = createFilterOptions<{
  label: string;
  id: number;
}>();

const defaultCity = {
  name: "TP Hồ Chí Minh",
  id: 10958,
};
const defaultDistrict = {
  label: `Nhập quận/ huyện`,
  id: -100,
};
const defaultWard = {
  label: `Nhập phường/ xã`,
  id: -100,
};
export default function CompanyNewEditForm({
  isEdit = false,
  company,
  closeModal,
}: Props) {
  const { onAddCompany, onUpdateCompany } = useCompany();
  const { translate } = useLocales();
  const listDistrict = useAppSelector(CitySelector.getListDistrict);
  const listWard = useAppSelector(CitySelector.getListWards);
  const listCity = useAppSelector(CitySelector.getListCity);
  const CompanySchema = Yup.object().shape({
    company_name: Yup.string().required("Nhập tên công ty"),
    districtSelect: Yup.object().required("Chọn quận"),
    wardSelect: Yup.object().required("Chọn huyện"),
    citySelect: Yup.object().required("Chọn thành phố"),
  });

  const defaultValues = useMemo(
    () => ({
      id: company?.id,
      company_name: company?.company_name,
      tax_code: company?.tax_code,
      email: company?.email,
      accountant_email: company?.accountant_email,
      districtSelect: company?.district
        ? {
            label: company?.district,
          }
        : defaultDistrict,
      citySelect: company?.city
        ? {
            name: company?.city,
            id: company?.city === defaultCity.name ? defaultCity.id : -100,
          }
        : defaultCity,
      wardSelect: company?.ward
        ? {
            label: company?.ward,
          }
        : defaultWard,
      phone: company?.phone,
      address: company?.address,
    }),
    [company]
  );
  console.log(company?.city === defaultCity.name, defaultValues);
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CompanySchema),
    // @ts-ignore
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [watchDistrict, watchCity] = watch(["districtSelect", "citySelect"]);
  const listWardsByDistrict = useMemo(() => {
    if (watchDistrict) {
      return listWard.length > 0
        ? listWard
            .find((e) => e.id === watchDistrict.id)
            ?.wards.map((f) => {
              return {
                label: f.name,
                id: f.id,
              };
            })
        : [defaultWard];
    }
    return [defaultWard];
  }, [watchDistrict]);

  const listDistrictByCity = useMemo(() => {
    if (watchCity && watchCity.id !== 10958) {
      return [defaultDistrict];
    }
    return listDistrict;
  }, [watchCity]);

  const onSubmit = async (data: FormValuesProps) => {
    if (isEdit) {
      const payload = {
        company_name: data.company_name,
        tax_code: data.tax_code,
        city: data.citySelect.name,
        email: data.email,
        accountant_email: data.accountant_email,
        district: data.districtSelect.label,
        phone: data.phone,
        address: data.address,
        ward: data.wardSelect.label,
      };
      const result = await onUpdateCompany(data.id || 0, payload);
      if (result) {
        reset();
        magicTableRef.current?.onRefresh();
        closeModal && closeModal();
      }
    } else {
      const payload = {
        company_name: data.company_name,
        tax_code: data.tax_code,
        city: data.citySelect.name,
        email: data.email,
        accountant_email: data.accountant_email,
        district: data.districtSelect.label,
        phone: data.phone,
        address: data.address,
        ward: data.wardSelect.label,
      };
      const result = await onAddCompany(payload);
      if (result) {
        navigate(PATH_APP.company.list);
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
                name="company_name"
                label={translate("company.form.company_name")}
              />
              <RHFTextField
                name="tax_code"
                label={translate("company.form.tax")}
              />
              <RHFTextField
                name="email"
                label={translate("company.form.email")}
              />
              <RHFTextField
                name="accountant_email"
                label={translate("company.form.emailAccount")}
              />
              <RHFTextField
                name="phone"
                label={translate("company.form.phone")}
              />
              <RHFTextField
                name="address"
                label={translate("company.form.address")}
              />
            </Box>
            <Stack
              flexDirection="row"
              sx={{ pt: 3 }}
              justifyContent="space-between"
            >
              <RHFAutocomplete
                name="citySelect"
                sx={{ minWidth: "30%" }}
                label={translate("company.form.city")}
                options={listCity}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  return option.name;
                }}
              />
              <RHFAutocomplete
                name="districtSelect"
                sx={{ minWidth: "30%" }}
                label={translate("company.form.district")}
                options={listDistrictByCity}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.find(
                    (e) => e.label === inputValue
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      label: inputValue,
                      id: -99,
                    });
                  }
                  return filtered;
                }}
                freeSolo
              />
              <RHFAutocomplete
                name="wardSelect"
                sx={{ minWidth: "30%" }}
                label={translate("company.form.ward")}
                options={listWardsByDistrict || []}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.find(
                    (e) => e.label === inputValue
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      label: inputValue,
                      id: -98,
                    });
                  }
                  return filtered;
                }}
                freeSolo
              />
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!isEdit
                  ? translate("company.companyAdd.title")
                  : translate("company.companyUpdate.title")}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
