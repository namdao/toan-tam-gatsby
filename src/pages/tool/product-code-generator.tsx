import React, { useMemo, useState } from "react";
import Helmet from "react-helmet";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Iconify from "components/iconify";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";
import ExcelJS from "exceljs";

// ----------------------------------------------------------------------

type AutoMode = "increment" | "random";

type ConfigForm = {
  prefix: string;
  length: number;
  autoMode: AutoMode;
  startFrom: number;
  amount: number;
};

type ProductCodeRow = {
  code: string;
  barcodeDataUrl: string;
  qrDataUrl: string;
};

const DEFAULT_CONFIG: ConfigForm = {
  prefix: "product_",
  length: 6,
  autoMode: "random",
  startFrom: 1,
  amount: 10,
};

const RANDOM_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const padLeft = (value: number, width: number) =>
  String(value).padStart(Math.max(width, 1), "0");

const randomString = (width: number) => {
  let out = "";
  for (let i = 0; i < width; i += 1) {
    out += RANDOM_CHARSET.charAt(
      Math.floor(Math.random() * RANDOM_CHARSET.length)
    );
  }
  return out || "0";
};

/**
 * Build the auto-generated part of the product code.
 * - increment: zero-padded sequence starting from `startFrom`.
 * - random: unique alphanumeric string of length `length`.
 */
const buildAutoStrings = (config: ConfigForm): string[] => {
  const { length, autoMode, startFrom, amount } = config;
  const safeLength = Math.max(length, 1);
  const safeAmount = Math.min(Math.max(amount, 1), 2000);

  if (autoMode === "increment") {
    return Array.from({ length: safeAmount }, (_, i) =>
      padLeft(startFrom + i, safeLength)
    );
  }

  // random — guarantee uniqueness across the batch
  const used = new Set<string>();
  const result: string[] = [];
  while (result.length < safeAmount) {
    const candidate = randomString(safeLength);
    if (!used.has(candidate)) {
      used.add(candidate);
      result.push(candidate);
    }
  }
  return result;
};

const renderBarcodeDataUrl = (code: string): string => {
  const canvas = document.createElement("canvas");
  try {
    JsBarcode(canvas, code, {
      format: "CODE128",
      displayValue: true,
      height: 50,
      width: 2,
      fontSize: 12,
      margin: 4,
    });
  } catch {
    return "";
  }
  return canvas.toDataURL("image/png");
};

const renderQrDataUrl = async (code: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(code, { margin: 1, width: 96 });
  } catch {
    return "";
  }
};

const extractBase64 = (dataUrl: string): string => {
  const [, base64] = dataUrl.split(",");
  return base64 || dataUrl;
};

const triggerDownload = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const exportToText = (rows: ProductCodeRow[]) => {
  const content = rows.map((row) => row.code).join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  triggerDownload(blob, "product-codes.txt");
};

const exportToExcel = async (rows: ProductCodeRow[]) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Mã sản phẩm", {
    properties: { defaultRowHeight: 66 },
  });

  sheet.columns = [
    { header: "Mã sản phẩm", key: "code", width: 32 },
    { header: "Mã vạch", key: "barcode", width: 28 },
    { header: "Mã QR", key: "qr", width: 18 },
  ];

  sheet.getRow(1).font = { bold: true };

  rows.forEach((row, index) => {
    const sheetRow = sheet.addRow({ code: row.code });
    sheetRow.height = 60;

    if (row.barcodeDataUrl) {
      const id = workbook.addImage({
        base64: extractBase64(row.barcodeDataUrl),
        extension: "png",
      });
      sheet.addImage(id, {
        tl: { col: 1, row: index + 1 },
        br: { col: 2, row: index + 2 },
      } as any);
    }

    if (row.qrDataUrl) {
      const id = workbook.addImage({
        base64: extractBase64(row.qrDataUrl),
        extension: "png",
      });
      sheet.addImage(id, {
        tl: { col: 2, row: index + 1 },
        br: { col: 3, row: index + 2 },
      } as any);
    }
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  triggerDownload(blob, "product-codes.xlsx");
};

// ----------------------------------------------------------------------

const ProductCodeGenerator = () => {
  const [config, setConfig] = useState<ConfigForm>(DEFAULT_CONFIG);
  const [rows, setRows] = useState<ProductCodeRow[]>([]);
  const [generating, setGenerating] = useState(false);
  const [exporting, setExporting] = useState(false);

  const canExport = rows.length > 0;
  const isIncrement = config.autoMode === "increment";

  const previewCode = useMemo(() => {
    const auto =
      config.autoMode === "increment"
        ? padLeft(config.startFrom, config.length)
        : "X".repeat(Math.max(config.length, 1));
    return `${config.prefix}${auto}`.toUpperCase();
  }, [config]);

  const handleChange = (field: keyof ConfigForm, value: string | number) =>
    setConfig((prev) => ({ ...prev, [field]: value }));

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const autoStrings = buildAutoStrings(config);
      const codes = autoStrings.map((auto) =>
        `${config.prefix}${auto}`.toUpperCase()
      );

      const built: ProductCodeRow[] = [];
      for (let i = 0; i < codes.length; i += 1) {
        const code = codes[i];
        const barcodeDataUrl = renderBarcodeDataUrl(code);
        // eslint-disable-next-line no-await-in-loop
        const qrDataUrl = await renderQrDataUrl(code);
        built.push({ code, barcodeDataUrl, qrDataUrl });
      }

      setRows(built);
    } finally {
      setGenerating(false);
    }
  };

  const handleExportText = () => {
    if (!canExport) return;
    exportToText(rows);
  };

  const handleExportExcel = async () => {
    if (!canExport) return;
    setExporting(true);
    try {
      await exportToExcel(rows);
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <Helmet title="Sinh mã sản phẩm" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Iconify icon="material-symbols:qr-code-rounded" width={28} />
            <Typography variant="h4">Sinh mã sản phẩm</Typography>
          </Stack>

          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Chuỗi tiền tố"
                    value={config.prefix}
                    onChange={(e) => handleChange("prefix", e.target.value)}
                    helperText="VD: product_"
                  />
                </Grid>

                <Grid item xs={6} md={2}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Độ dài phần tự sinh"
                    value={config.length === 0 ? "" : config.length}
                    onChange={(e) =>
                      handleChange("length", Number(e.target.value))
                    }
                    inputProps={{ min: 1, max: 32 }}
                    helperText="Số ký tự tự sinh"
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <TextField
                    fullWidth
                    select
                    label="Cách sinh mã"
                    value={config.autoMode}
                    onChange={(e) =>
                      handleChange("autoMode", e.target.value as AutoMode)
                    }
                  >
                    <MenuItem value="random">Chuỗi ngẫu nhiên</MenuItem>
                    <MenuItem value="increment">Tăng dần</MenuItem>
                  </TextField>
                </Grid>

                {isIncrement ? (
                  <Grid item xs={6} md={3}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Bắt đầu từ"
                      value={config.startFrom === 0 ? "" : config.startFrom}
                      onChange={(e) =>
                        handleChange("startFrom", Number(e.target.value))
                      }
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={6} md={3}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Số lượng mã"
                      value={config.amount === 0 ? "" : config.amount}
                      onChange={(e) =>
                        handleChange("amount", Number(e.target.value))
                      }
                      inputProps={{ min: 1, max: 2000 }}
                    />
                  </Grid>
                )}

                {isIncrement && (
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Số lượng mã"
                      value={config.amount === 0 ? "" : config.amount}
                      onChange={(e) =>
                        handleChange("amount", Number(e.target.value))
                      }
                      inputProps={{ min: 1, max: 2000 }}
                    />
                  </Grid>
                )}
              </Grid>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 2 }}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Xem trước: <b>{previewCode}</b>
                  </Typography>
                </Box>
                <LoadingButton
                  variant="contained"
                  size="large"
                  loading={generating}
                  onClick={handleGenerate}
                  startIcon={<Iconify icon="eva:flash-fill" />}
                >
                  Sinh mã
                </LoadingButton>
              </Stack>
            </CardContent>
          </Card>

          {canExport && (
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<Iconify icon="eva:file-text-outline" />}
                onClick={handleExportText}
              >
                Xuất file TXT
              </Button>
              <LoadingButton
                variant="outlined"
                loading={exporting}
                startIcon={<Iconify icon="eva:file-add-outline" />}
                onClick={handleExportExcel}
              >
                Xuất file Excel
              </LoadingButton>
            </Stack>
          )}

          {rows.length > 0 && (
            <Card>
              <TableContainer sx={{ maxHeight: 560 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Mã sản phẩm</TableCell>
                      <TableCell>Mã vạch</TableCell>
                      <TableCell>Mã QR</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={row.code} hover>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontFamily="monospace">
                            {row.code}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {row.barcodeDataUrl ? (
                            <Box
                              component="img"
                              src={row.barcodeDataUrl}
                              alt={row.code}
                              sx={{ maxWidth: 180, height: "auto" }}
                            />
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell>
                          {row.qrDataUrl ? (
                            <Box
                              component="img"
                              src={row.qrDataUrl}
                              alt={row.code}
                              sx={{ width: 64, height: 64 }}
                            />
                          ) : (
                            "—"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default ProductCodeGenerator;
