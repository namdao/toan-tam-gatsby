import React, { useCallback } from "react";
import * as Yup from "yup";
import { useEffect, useMemo } from "react";
// form
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  alpha,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
// assets
// components
import FormProvider, {
  RHFAutocomplete,
  RHFNumberFormat,
  RHFRadioGroup,
  RHFTextField,
  RHFUpload,
} from "components/hook-form";
import { useLocales } from "locales";
import { navigate } from "gatsby";
import { useAppSelector } from "store";
import { customerSelector } from "scenes/customer/redux/slice";
import { styled } from "@mui/material/styles";
import Iconify from "components/iconify";
import RHFDatePicker from "components/hook-form/RHFDatePicker";
import { CategoriesSelector } from "scenes/categories/redux/slice";
import {
  ICategoryDefault,
  IDataCategories,
} from "scenes/categories/redux/types";
import { PaperTypeSelector } from "scenes/papers/redux/slice";
import { sortBy } from "lodash";
import { ORDER_STATUS_NAME, ORDER_TYPE } from "../helper/OrderConstant";
import { IOrder, IOrderDetail } from "../redux/types";
import { getTotalAmount } from "utils/utility";
import { parseToNumber } from "utils/formatNumber";
import { LoadingButton } from "@mui/lab";
import { getImageToAws } from "utils/imageHandler";
import { useOrderCreate } from "../hooks/useOrderCreate";
import { OutsourceSelector } from "scenes/outsources/redux/slice";
import { PrintTypeSelector } from "scenes/printtype/redux/slice";
import { PATH_APP } from "constant/routeConstant";
import { magicOrderProcessingRef } from "../screens/OrderProcessing/OrderTable";
import { addDays } from "date-fns";
type CustomerItem = {
  id: number;
  label: string;
  customerName: string;
  address: string;
};
type CategoryItem = {
  id: number;
  label: string;
  parentId: number;
  parentValue: string;
};
type AutocompleteItem = {
  id: number;
  label: string;
};
type OutSourceItem = {
  id: number;
  name: string;
  group: string;
  max_select: number;
};
export interface FormOrderValuesProps {
  id?: number;
  // customer info
  customerInfo: CustomerItem | null;
  delivery_address: string;
  delivery_date: Date;
  receiver_info: string;
  // order info
  order_type: ORDER_TYPE;
  name: string;
  method: string;
  category_id: CategoryItem | null;
  paper_id: AutocompleteItem | null;
  print_type_ids: AutocompleteItem | null;
  number_print_face: number;
  outsource_ids?: OutSourceItem[];
  // payment info
  template_number: string | number | null;
  quantity: string | number | null;
  unit_price: string | number | null;
  design_fee: string | number | null;
  shipping_fee: string | number | null;
  deposite: string | number | null;
  vat: boolean;
  status: ORDER_STATUS_NAME;
  payment_method: string;
  // others
  note: string;
  order_detail_notes: string;
  image:
    | (File & {
        preview: string;
      })
    | string
    | null;
  imageList: string[] | null;
  amount: number;
  method_width: string;
  method_height: string;
  method_high: string;
}

type Props = {
  isDisable?: boolean;
  order?: IOrderDetail;
  handleClose?: () => void;
  isCopy?: boolean;
};

const StyledIcon = styled(Iconify)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const OrderSubmitSchema = Yup.object().shape({
  customerInfo: Yup.object()
    .typeError("Chọn khách hàng")
    .required("Chọn khách hàng"),
  delivery_address: Yup.string().required("Nhập địa chỉ"),
  delivery_date: Yup.date().typeError("Chọn ngày giao hàng"),
  receiver_info: Yup.string().required("Nhập người nhận hàng"),
  name: Yup.string().required("Nhập file thiết kế"),
  method_width: Yup.string().required("bắt buộc"),
  method_height: Yup.string().required("bắt buộc"),
  category_id: Yup.object().required("Chọn hàng hóa"),
  paper_id: Yup.object().required("Chọn kiểu giấy").typeError("Chọn kiểu giấy"),
  print_type_ids: Yup.object()
    .required("Chọn kiểu in")
    .typeError("Chọn kiểu in"),
  template_number: Yup.string()
    .required("Nhập số lượng mẫu")
    .typeError("Nhập số lượng mẫu"),
  quantity: Yup.string()
    .required("Nhập số lượng in")
    .typeError("Nhập số lượng in"),
  unit_price: Yup.string().required("Nhập đơn giá").typeError("Nhập đơn giá"),
  note: Yup.string().required("Nhập ghi chú"),
  order_detail_notes: Yup.string().required("Nhập ghi chú sản xuất"),
});

const OrderDraftSchema = Yup.object().shape({
  customerInfo: Yup.object()
    .typeError("Chọn khách hàng")
    .required("Chọn khách hàng"),
  category_id: Yup.object().required("Chọn hàng hóa"),
  paper_id: Yup.object().required("Chọn kiểu giấy").typeError("Chọn kiểu giấy"),
  note: Yup.string().required("Nhập ghi chú"),
});

const resolver: Resolver<FormOrderValuesProps> = async (
  data,
  context,
  options
) => {
  if (data.status === ORDER_STATUS_NAME.DRAFT) {
    return yupResolver(OrderDraftSchema)(data, context, options);
  }
  return yupResolver(OrderSubmitSchema)(data, context, options);
};
export default function OrderNewEditForm({
  isDisable = false,
  order,
  handleClose,
  isCopy = false,
}: Props) {
  const { translate } = useLocales();
  const theme = useTheme();
  const { isStatus, createOrder, updateOrder } = useOrderCreate();
  const customerList = useAppSelector(customerSelector.getCustomerList);
  const paperList = useAppSelector(PaperTypeSelector.getListPaper);
  const outsourceList = useAppSelector(OutsourceSelector.getListOutsource);
  const categoriesMobileList = useAppSelector(
    CategoriesSelector.getListCategories
  );
  const listPrintType = useAppSelector(PrintTypeSelector.getListPrintType);
  const parseCategoriesToList = useCallback(() => {
    let dataCombine: IDataCategories[] = [];
    const keysCat: ICategoryDefault[] = Object.keys(
      categoriesMobileList
    ) as ICategoryDefault[];
    keysCat.forEach((e) => {
      const listByParent = categoriesMobileList[e];
      dataCombine = dataCombine.concat(listByParent);
    });
    return dataCombine;
  }, [categoriesMobileList]);

  const categoryAutoComplete = parseCategoriesToList().map((e) => {
    return {
      id: e.id,
      label: e.category_name,
      parentId: e.parent_id || -1,
      parentValue: e?.category_parent?.category_name || "",
    };
  });

  const customerAutoComplete = useMemo(
    () =>
      customerList.map((e) => {
        let fullAddress = e.address;
        if (!e.city.includes("Ngoại thành")) {
          const hasAddress = e.address ? `${e.address},` : "";
          const hasDistrict = e.district ? `${e.district},` : "";
          const hasWard = e.ward ? `${e.ward},` : "";
          const hasCity = e.city ? `${e.city},` : "";
          const mergeAddress = `${hasAddress} ${hasDistrict} ${hasWard} ${hasCity}`;
          fullAddress = mergeAddress.slice(0, mergeAddress.lastIndexOf(","));
        }
        return {
          id: e.id,
          label: `${e.name} - ${e.phone} - (${e.company?.company_name}) `,
          customerName: e.name,
          address: fullAddress,
        };
      }),
    []
  );

  // const arry = customerAutoComplete.map((e) => e.label);
  // const toFindDuplicates = (arry1) => {
  //   return arry1.filter((item, index) => arry1.indexOf(item) !== index);
  // };
  // const duplicateElementa = toFindDuplicates(arry);
  // console.log(duplicateElementa);
  const printTypeAutocomplete = useMemo(
    () =>
      listPrintType.map((e) => {
        return {
          id: e.id,
          label: e.print_type_name,
        };
      }),
    [listPrintType]
  );

  const paperAutoComplete = useMemo(
    () =>
      sortBy(
        paperList.map((e) => {
          return {
            id: e.id,
            label: e.paper_code,
          };
        }),
        "label"
      ),
    []
  );

  const defaultValues = useMemo(() => {
    const splitMethod = order?.method ? order.method.split("x") : "";
    return {
      order_type: order?.order_type || ORDER_TYPE.CUSTOM,
      customerInfo: order?.customer_id
        ? customerAutoComplete.find((e) => e.id === order.customer_id)
        : null,
      delivery_address: order?.delivery_address || "",
      receiver_info: order?.receiver_info || "",
      name: order?.name || "",
      method_width: order?.method ? Number(splitMethod[0]) : "",
      method_height: order?.method ? Number(splitMethod[1]) : "",
      method_high:
        order?.method && splitMethod.length > 2 ? Number(splitMethod[2]) : "",
      category_id: order?.category_id
        ? categoryAutoComplete.find((e) => e.id === order.category_id)
        : null,
      paper_id: order?.paper_id
        ? paperAutoComplete.find((e) => e.id === order.paper_id)
        : null,
      print_type_ids:
        order && order?.print_type_ids?.length > 0
          ? printTypeAutocomplete.find((e) => e.id === order?.print_type_ids[0])
          : null,
      template_number: order?.template_number || null,
      quantity: order?.quantity || null,
      unit_price: order?.unit_price || null,
      delivery_date: addDays(new Date(), 5),
      payment_method:
        order?.payment_method ||
        translate("orders.orderCreate.form.paymentCash"),
      image:
        !isCopy && order && order?.images?.length > 0
          ? getImageToAws(order?.images[0])
          : null,
      imageList: order?.images,
      number_print_face: order?.number_print_face || 1,
      order_detail_notes: order?.order_detail_notes || "",
      outsource_ids:
        order?.outsources && order?.outsources?.length > 0
          ? order?.outsources
          : // autocomplete is multi => value must be array
            [outsourceList[0]],
      id: order?.id,
      status: order?.status,
    };
  }, [order]);

  const methods = useForm<FormOrderValuesProps>({
    resolver,
    defaultValues,
  });

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [
    customerInfo,
    unit_price,
    template_number,
    quantity,
    design_fee,
    shipping_fee,
    deposite,
  ] = watch([
    "customerInfo",
    "unit_price",
    "template_number",
    "quantity",
    "design_fee",
    "shipping_fee",
    "deposite",
  ]);

  useEffect(() => {
    if (isStatus === "success") {
      if (order?.id) {
        handleClose && handleClose();
        magicOrderProcessingRef.current?.refreshList();
      } else {
        navigate(PATH_APP.order.processing);
      }
    }
  }, [isStatus]);

  useEffect(() => {
    if (customerInfo) {
      setValue("delivery_address", customerInfo.address);
      setValue("receiver_info", customerInfo.customerName);
    } else {
      setValue("delivery_address", "");
      setValue("receiver_info", "");
    }
  }, [customerInfo]);

  useEffect(() => {
    const order = {
      unit_price:
        typeof unit_price === "string"
          ? parseToNumber(unit_price?.replaceAll(",", "") || "0")
          : unit_price,
      template_number:
        typeof template_number === "string"
          ? parseToNumber(template_number?.replaceAll(",", "") || "0")
          : template_number,
      quantity:
        typeof quantity === "string"
          ? parseToNumber(quantity?.replaceAll(",", "") || "0")
          : quantity,
      design_fee:
        typeof design_fee === "string"
          ? parseToNumber(design_fee?.replaceAll(",", "") || "0")
          : design_fee,
      shipping_fee:
        typeof shipping_fee === "string"
          ? parseToNumber(shipping_fee?.replaceAll(",", "") || "0")
          : shipping_fee,
      deposite:
        typeof deposite === "string"
          ? parseToNumber(deposite?.replaceAll(",", "") || "0")
          : deposite,
    } as IOrder;
    const totalAmount = getTotalAmount(order);
    setValue("amount", totalAmount);
  }, [
    unit_price,
    template_number,
    quantity,
    design_fee,
    shipping_fee,
    deposite,
  ]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("image", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue("image", null);
  };
  const onSubmit = async (data: FormOrderValuesProps) => {
    if (data.id && !isCopy) {
      updateOrder(data);
    } else {
      createOrder(data);
    }
  };

  const onUpdateOrder = () => {
    handleSubmit(onSubmit)();
  };
  const onCreateOrder = () => {
    setValue("status", ORDER_STATUS_NAME.SALE);
    handleSubmit(onSubmit)();
  };
  const onSaveDraftOrder = () => {
    setValue("status", ORDER_STATUS_NAME.DRAFT);
    handleSubmit(onSubmit)();
  };

  const onCancelOrder = () => {
    setValue("status", ORDER_STATUS_NAME.CANCEL);
    handleSubmit(onSubmit)();
  };

  const blockCustomerInfo = () => (
    <Card>
      <CardHeader
        title={translate("orders.orderCreate.form.titleCustomer")}
        sx={{ color: theme.palette.primary.main }}
      />
      <Stack direction="row" alignItems="center">
        <Grid item xs={12} md={6}>
          <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
            <StyledIcon icon="mdi:user-arrow-right-outline" width={32} />
            <RHFAutocomplete
              disabled={isDisable}
              name="customerInfo"
              label={translate("orders.orderCreate.form.customerName")}
              disablePortal
              autoHighlight
              options={customerAutoComplete}
              fullWidth
            />
          </Stack>
          <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
            <StyledIcon icon="la:address-card" width={32} />
            <RHFTextField
              disabled={isDisable}
              name="delivery_address"
              label={translate("orders.orderCreate.form.deliveryAddress")}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
            <StyledIcon icon="mdi:user-arrow-left-outline" width={32} />
            <RHFTextField
              disabled={isDisable}
              name="receiver_info"
              label={translate("orders.orderCreate.form.receiverName")}
            />
          </Stack>
          <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
            <StyledIcon icon="ic:baseline-date-range" width={32} />
            <RHFDatePicker
              disabled={isDisable}
              name="delivery_date"
              sx={{ width: "100%" }}
              label={translate("orders.orderCreate.form.deliveryDate")}
            />
          </Stack>
        </Grid>
      </Stack>
    </Card>
  );

  const blockOrderInfo = () => (
    <Card>
      <CardHeader
        title={translate("orders.orderCreate.form.titleOrder")}
        sx={{ color: theme.palette.primary.main }}
      />
      <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
        <RHFRadioGroup
          row
          label={translate("orders.orderCreate.form.orderType")}
          name="order_type"
          defaultValue="CUSTOM"
          options={[
            {
              label: translate("orders.orderCreate.form.orderCustom"),
              value: "CUSTOM",
              disable: isDisable,
            },
            {
              label: translate("orders.orderCreate.form.orderNormal"),
              value: "NORMAL",
              disable: isDisable,
            },
          ]}
        />
      </Stack>
      <Stack direction="row" alignItems="center">
        <Grid item xs={12} md={6}>
          <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
            <StyledIcon icon="ph:file" width={32} />
            <RHFTextField
              disabled={isDisable}
              name="name"
              label={translate("orders.orderCreate.form.fileName")}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
            {/* <StyledIcon icon="codicon:symbol-method" width={32} /> */}
            <RHFTextField
              disabled={isDisable}
              name="method_width"
              inputProps={{
                type: "number",
                onInput: (e) => {
                  // @ts-ignore
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 4);
                },
                min: 0,
              }}
            />
            X
            <RHFTextField
              disabled={isDisable}
              name="method_height"
              inputProps={{
                type: "number",
                onInput: (e) => {
                  // @ts-ignore
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 4);
                },
                min: 0,
              }}
            />
            X
            <RHFTextField
              disabled={isDisable}
              name="method_high"
              inputProps={{
                type: "number",
                onInput: (e) => {
                  // @ts-ignore
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 4);
                },
                min: 0,
              }}
            />
            {/* <RHFInputMask
              inputMask={{
                mask: isDisable ? "" : "9999 x 9999 x 9999",
                maskPlaceholder: "____ x ____ x ____",
                alwaysShowMask: true,
                disabled: isDisable,
              }}
              name="method"
              textFieldProps={{
                label: translate("orders.orderCreate.form.method"),
              }}
            /> */}
          </Stack>
        </Grid>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Grid item xs={12} md={6}>
          <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
            <StyledIcon icon="carbon:categories" width={32} />
            <RHFAutocomplete
              disabled={isDisable}
              name="category_id"
              label={translate("orders.orderCreate.form.categoryList")}
              disablePortal
              autoHighlight
              options={categoryAutoComplete}
              groupBy={(option) => option.parentValue}
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
            <StyledIcon icon="mdi:paper-check" width={32} />
            <RHFAutocomplete
              disabled={isDisable}
              name="paper_id"
              label={translate("orders.orderCreate.form.paperType")}
              disablePortal
              autoHighlight
              options={paperAutoComplete}
              fullWidth
            />
          </Stack>
        </Grid>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Grid item xs={12} md={6}>
          <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
            <StyledIcon icon="material-symbols:print" width={32} />
            <RHFAutocomplete
              disabled={isDisable}
              name="print_type_ids"
              label={translate("orders.orderCreate.form.printType")}
              disablePortal
              autoHighlight
              options={printTypeAutocomplete}
              sx={{ width: "100%" }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
            <RHFRadioGroup
              row
              name="number_print_face"
              defaultValue="1"
              options={[
                {
                  label: translate("orders.orderCreate.form.oneFace"),
                  value: "1",
                  disable: isDisable,
                },
                {
                  label: translate("orders.orderCreate.form.twoFace"),
                  value: "2",
                  disable: isDisable,
                },
              ]}
            />
          </Stack>
        </Grid>
      </Stack>
      <Stack direction="row" alignItems="center">
        <Grid item xs={12} md={12}>
          <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
            <StyledIcon icon="clarity:factory-solid" width={32} />
            <RHFAutocomplete
              multiple
              fullWidth
              disabled={isDisable}
              options={outsourceList}
              name="outsource_ids"
              disableCloseOnSelect
              label={translate("orders.orderCreate.form.outsources")}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              groupBy={(option) => option?.group || ""}
              getOptionLabel={(props) => {
                if (typeof props === "string") return props;
                return props.name;
              }}
              renderOption={(props, option, { selected }) => {
                return (
                  <li {...props}>
                    <Checkbox
                      icon={<Iconify icon={"carbon:checkbox"} />}
                      checkedIcon={<Iconify icon="ri:checkbox-fill" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option?.name}
                  </li>
                );
              }}
            />
          </Stack>
        </Grid>
      </Stack>
    </Card>
  );

  const blockImageOrder = () => {
    return (
      <Card>
        <CardHeader
          title={translate("orders.orderCreate.form.titleImage")}
          sx={{ color: theme.palette.primary.main }}
        />
        <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
          <RHFUpload
            disabled={isDisable}
            name="image"
            maxSize={3145728}
            onDrop={handleDrop}
            onDelete={isDisable ? () => {} : handleRemoveFile}
            sx={{
              height: 415,
              display: "flex",
            }}
          />
        </Stack>
      </Card>
    );
  };

  const blockPaymentOrder = () => {
    return (
      <Card>
        <CardHeader
          title={translate("orders.orderCreate.form.titlePayment")}
          sx={{ color: theme.palette.primary.main }}
        />
        <Stack direction="row" alignItems="center">
          <Grid item xs={12} md={4}>
            <Stack sx={{ pl: 3, py: 2 }} direction="row" alignItems="center">
              <StyledIcon icon="ri:file-paper-line" width={32} />
              <RHFNumberFormat
                disabled={isDisable}
                name="template_number"
                label={translate("orders.orderCreate.form.templateNumber")}
                sx={{ width: "100%" }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack sx={{ pl: 3, py: 2 }} direction="row" alignItems="center">
              <StyledIcon icon="ri:file-paper-line" width={32} />
              <RHFNumberFormat
                disabled={isDisable}
                name="quantity"
                label={translate("orders.orderCreate.form.printNumber")}
                sx={{ width: "100%" }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
              <StyledIcon icon="material-symbols:attach-money" width={32} />
              <RHFNumberFormat
                disabled={isDisable}
                name="unit_price"
                label={translate("orders.orderCreate.form.price")}
                sx={{ width: "100%" }}
              />
            </Stack>
          </Grid>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Grid item xs={12} md={4}>
            <Stack sx={{ pl: 3, py: 2 }} direction="row" alignItems="center">
              <StyledIcon icon="material-symbols:attach-money" width={32} />
              <RHFNumberFormat
                disabled={isDisable}
                name="design_fee"
                label={translate("orders.orderCreate.form.designFee")}
                sx={{ width: "100%" }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack sx={{ pl: 3, py: 2 }} direction="row" alignItems="center">
              <StyledIcon icon="material-symbols:attach-money" width={32} />
              <RHFNumberFormat
                disabled={isDisable}
                name="shipping_fee"
                label={translate("orders.orderCreate.form.shippingFee")}
                sx={{ width: "100%" }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack sx={{ px: 3, py: 2 }} direction="row" alignItems="center">
              <StyledIcon icon="material-symbols:attach-money" width={32} />
              <RHFNumberFormat
                disabled={isDisable}
                name="deposite"
                label={translate("orders.orderCreate.form.deposite")}
                sx={{ width: "100%" }}
              />
            </Stack>
          </Grid>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Grid item xs={12} md={4}>
            <Stack sx={{ pl: 3, py: 2 }} direction="row" alignItems="center">
              <RHFRadioGroup
                row
                label={translate("orders.orderCreate.form.vat")}
                name="vat"
                defaultValue={false}
                options={[
                  {
                    label: translate("orders.orderCreate.form.vatNo"),
                    value: false,
                    disable: isDisable,
                  },
                  {
                    label: translate("orders.orderCreate.form.vatYes"),
                    value: true,
                    disable: isDisable,
                  },
                ]}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack sx={{ pl: 3, py: 2 }} direction="row" alignItems="center">
              <RHFRadioGroup
                row
                label={translate("orders.orderCreate.form.paymentMethod")}
                name="payment_method"
                defaultValue={translate("orders.orderCreate.form.paymentCash")}
                options={[
                  {
                    label: translate("orders.orderCreate.form.paymentCash"),
                    value: translate("orders.orderCreate.form.paymentCash"),
                    disable: isDisable,
                  },
                  {
                    label: translate("orders.orderCreate.form.paymentDebt"),
                    value: translate("orders.orderCreate.form.paymentDebt"),
                    disable: isDisable,
                  },
                  {
                    label: translate("orders.orderCreate.form.paymentAtm"),
                    value: translate("orders.orderCreate.form.paymentAtm"),
                    disable: isDisable,
                  },
                ]}
              />
            </Stack>
          </Grid>
        </Stack>
        <Divider sx={{ mx: 3 }} />
        <Stack
          justifyContent="flex-end"
          alignItems="center"
          direction="row"
          sx={{ p: 3 }}
          spacing={2}
        >
          <Typography variant="h5">
            {translate("orders.orderDetail.price.amount")}
          </Typography>
          <RHFNumberFormat
            name="amount"
            disabled
            sx={{ fontSize: 20, color: "red" }}
          />
        </Stack>
      </Card>
    );
  };

  const blockActionButton = () => {
    const actionBtnLeft =
      order?.id && order.status !== ORDER_STATUS_NAME.DRAFT
        ? {
            title: translate("orders.orderCreate.form.btnCancelOrder"),
            action: onCancelOrder,
          }
        : {
            title: translate("orders.orderCreate.form.btnUpdateDraft"),
            action: onSaveDraftOrder,
          };
    const actionBtnRight =
      order?.id && order.status !== ORDER_STATUS_NAME.DRAFT
        ? {
            title: translate("orders.orderCreate.form.btnUpdateOrder"),
            action: onUpdateOrder,
          }
        : {
            title: translate("orders.orderCreate.form.btnCreateOrder"),
            action: onCreateOrder,
          };

    return (
      <Card>
        <Stack flexDirection="row" sx={{ px: 3, py: 2 }}>
          <Grid item xs={12} md={4}>
            <RHFTextField
              name="order_detail_notes"
              label={translate("orders.orderCreate.form.notes_detail")}
              inputProps={{
                maxLength: 255,
              }}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ px: 3 }}>
            <RHFTextField
              name="note"
              label={translate("orders.orderCreate.form.notes")}
              inputProps={{
                maxLength: 255,
              }}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ alignSelf: "center" }}>
            <Stack flexDirection="row" justifyContent="flex-end">
              <LoadingButton
                type="button"
                size="large"
                onClick={actionBtnLeft.action}
                variant="contained"
                loading={isSubmitting || isStatus === "loading"}
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.warning.main, 0.8),
                  mr: 2,
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "common.white"
                      : "grey.800",
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.warning.main,
                    color: (theme) =>
                      theme.palette.mode === "light"
                        ? "common.white"
                        : "grey.800",
                  },
                }}
              >
                {actionBtnLeft.title}
              </LoadingButton>
              <LoadingButton
                type="button"
                onClick={actionBtnRight.action}
                size="large"
                variant="contained"
                loading={isSubmitting || isStatus === "loading"}
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.8),
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "common.white"
                      : "grey.800",
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.primary.main,
                    color: (theme) =>
                      theme.palette.mode === "light"
                        ? "common.white"
                        : "grey.800",
                  },
                }}
              >
                {actionBtnRight.title}
              </LoadingButton>
            </Stack>
          </Grid>
        </Stack>
      </Card>
    );
  };

  const blockButtonCopy = () => {
    const actionBtnRight = {
      title: translate("orders.orderCreate.form.btnCreateOrder"),
      action: onCreateOrder,
    };

    return (
      <Card>
        <Stack flexDirection="row" sx={{ px: 3, py: 2 }}>
          <Grid item xs={12} md={4}>
            <RHFTextField
              name="order_detail_notes"
              label={translate("orders.orderCreate.form.notes_detail")}
              inputProps={{
                maxLength: 255,
              }}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ px: 3 }}>
            <RHFTextField
              name="note"
              label={translate("orders.orderCreate.form.notes")}
              inputProps={{
                maxLength: 255,
              }}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ alignSelf: "center" }}>
            <Stack flexDirection="row" justifyContent="flex-end">
              <LoadingButton
                type="button"
                onClick={actionBtnRight.action}
                size="large"
                variant="contained"
                loading={isSubmitting || isStatus === "loading"}
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.8),
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "common.white"
                      : "grey.800",
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.primary.main,
                    color: (theme) =>
                      theme.palette.mode === "light"
                        ? "common.white"
                        : "grey.800",
                  },
                }}
              >
                {actionBtnRight.title}
              </LoadingButton>
            </Stack>
          </Grid>
        </Stack>
      </Card>
    );
  };
  return (
    <FormProvider methods={methods}>
      <Grid
        container
        spacing={3}
        sx={{ p: isDisable || isCopy ? 4 : "inherit" }}
      >
        <Grid item xs={12} md={12}>
          {blockCustomerInfo()}
        </Grid>
        <Grid item xs={12} md={7}>
          {blockOrderInfo()}
        </Grid>
        <Grid item xs={12} md={5}>
          {blockImageOrder()}
        </Grid>
        <Grid item xs={12} md={12}>
          {blockPaymentOrder()}
        </Grid>
        <Grid item xs={12} md={12}>
          {isCopy ? blockButtonCopy() : blockActionButton()}
        </Grid>
      </Grid>
    </FormProvider>
  );
}
