import React from "react";
import * as Yup from "yup";
import { useEffect, useMemo } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardHeader,
  createFilterOptions,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
} from "@mui/material";
// routes
import { PATH_APP } from "constant/routeConstant";
// components
import FormProvider, {
  RHFAutocomplete,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from "components/hook-form";
import { useLocales } from "locales";
import { navigate } from "gatsby";
import { ICompany, ICustomer } from "constant/commonType";
import { useCustomer } from "../hooks/useCustomer";
import { useAppDispatch, useAppSelector } from "store";
import {
  CitySelector,
  IDistrict,
  IWard,
} from "services/settings/redux/city.slice";
import { IResCityDistrictWard } from "services/settings/redux/types";
import { CUSTOMER_TYPE, IReqAddCustomer } from "../redux/types";
import Iconify from "components/iconify";
import { companySelector } from "scenes/company/redux/slice";

interface FormValuesProps {
  id?: number;
  district?: string;
  districtSelect: IDistrict;
  wards?: string;
  wardSelect: IWard & { label?: string };
  citySelect: IResCityDistrictWard;
  city?: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  customer_type: CUSTOMER_TYPE;
  companySelect: string;
  company_id?: ICompany;
  personal: boolean;
}

type Props = {
  isEdit?: boolean;
  customer?: ICustomer;
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
const customerType = [
  {
    label: "Khách vãng lai",
    value: CUSTOMER_TYPE.VANG_LAI,
  },
  {
    label: "Khách thường xuyên",
    value: CUSTOMER_TYPE.THUONG_XUYEN,
  },
];
export default function CustomerNewEditForm({
  isEdit = false,
  customer,
  closeModal,
}: Props) {
  const { onAddCustomer, onUpdateCustomer, getCustomerList } = useCustomer();
  const { translate } = useLocales();
  const listDistrict = useAppSelector(CitySelector.getListDistrict);
  const listWard = useAppSelector(CitySelector.getListWards);
  const listCity = useAppSelector(CitySelector.getListCity);
  const listCompany = useAppSelector(companySelector.getCompanyList);
  const CompanySchema = Yup.object().shape({
    name: Yup.string().required("Nhập tên khách hàng"),
    email: Yup.string()
      .email("Email không đúng")
      .required("Nhập email khách hàng"),
    phone: Yup.string().required("Nhập số điện thoại"),
    address: Yup.string().required("Nhập địa chỉ"),
    districtSelect: Yup.object().required("Chọn quận"),
    wardSelect: Yup.object().required("Chọn huyện"),
    citySelect: Yup.object().required("Chọn thành phố"),
    customer_type: Yup.string().required("Chọn loại khách hàng"),
  });
  console.log(customer);
  const defaultValues = useMemo(
    () => ({
      id: customer?.id,
      name: customer?.name,
      email: customer?.email,
      districtSelect: customer?.district
        ? {
            label: customer?.district,
          }
        : defaultDistrict,
      wardSelect: customer?.ward
        ? {
            label: customer?.ward,
          }
        : defaultWard,
      citySelect: customer?.city
        ? {
            name: customer?.city,
            // gan id de tim quan theo id hcm, kg co thi tra ve -100 de quan la empty
            id: customer?.city === defaultCity.name ? defaultCity.id : -100,
          }
        : defaultCity,
      phone: customer?.phone,
      address: customer?.address,
      personal: customer?.personal || true,
      customer_type: customer?.customer_type,
      company_id: customer?.company?.id
        ? {
            id: customer.company.id,
            company_name: customer.company.company_name,
          }
        : "",
    }),
    [customer]
  );
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
    const payload: IReqAddCustomer = {
      name: data.name,
      customer_type: data.customer_type,
      city: data.citySelect.name,
      email: data.email,
      district: data.districtSelect.label,
      phone: data.phone,
      address: data.address,
      ward: data.wardSelect.label || "",
      personal: data.company_id ? false : true,
      company_id: data.company_id?.id,
    };
    if (isEdit && data?.id) {
      const result = await onUpdateCustomer(data.id, payload);
      if (result) {
        reset();
        closeModal && closeModal();
        getCustomerList(true);
      }
    } else {
      const result = await onAddCustomer(payload);
      if (result) {
        navigate(PATH_APP.customer.list);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={6} md={6}>
          <Card>
            <CardHeader title={translate("customer.form.info")} />
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField
                name="name"
                label={translate("customer.form.name")}
                InputProps={{
                  startAdornment: (
                    <Iconify icon="mdi:user-outline" width={24} />
                  ),
                }}
              />
              <RHFTextField
                name="email"
                label={translate("customer.form.email")}
                InputProps={{
                  startAdornment: (
                    <Iconify icon="mdi:email-outline" width={24} />
                  ),
                }}
              />
              <RHFTextField
                name="phone"
                label={translate("customer.form.phone")}
                InputProps={{
                  startAdornment: <Iconify icon="mdi:phone" width={24} />,
                }}
              />
              <RHFRadioGroup
                row
                label={translate("customer.form.customer_type")}
                name="customer_type"
                options={customerType}
              />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={6} md={6}>
          <Card>
            <CardHeader title={translate("customer.form.address")} />
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField
                name="address"
                label={translate("customer.form.address")}
                InputProps={{
                  startAdornment: (
                    <Iconify icon="fa:address-card-o" width={24} />
                  ),
                }}
              />
              <Stack flexDirection="row" justifyContent="space-between">
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
              <Stack>
                <RHFAutocomplete
                  name="company_id"
                  label={translate("customer.form.company_id")}
                  helperText={translate("customer.form.helperCompany")}
                  options={listCompany}
                  getOptionLabel={(options) => {
                    if (typeof options === "string") return options;
                    return options.company_name;
                  }}
                  renderOption={(props, options) => (
                    <li {...props} value={options.id}>
                      {options.company_name}
                    </li>
                  )}
                />
              </Stack>
            </Stack>
            <Stack alignItems="flex-end" sx={{ pt: 1, pr: 3, pb: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!isEdit
                  ? translate("customer.customerAdd.title")
                  : translate("customer.customerUpdate.title")}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
