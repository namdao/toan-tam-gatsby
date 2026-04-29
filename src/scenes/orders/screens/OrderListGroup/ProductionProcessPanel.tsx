import React, { FC, useState, useCallback, useRef } from "react";

// Variant of uploadImageToAws that accepts an explicit Content-Type,
// avoiding mismatches between the presigned URL signature and the PUT header.
const uploadImageToAwsWithType = async (
  url: string,
  file: File,
  contentType: string
): Promise<boolean> => {
  try {
    const result = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: file,
    });
    return result.status === 200;
  } catch (err) {
    console.error("S3 upload error:", err);
    return false;
  }
};
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "components/iconify";
import Label from "components/label";
import { LabelColor } from "components/label/types";
import ImagePopup from "scenes/orders/components/ImagePopup";
import { getImageToAws, uploadImageToAws } from "utils/imageHandler";
import {
  IProductionProcess,
  IReqCreateProcess,
} from "scenes/orders/redux/types";
import {
  apiGetGroupProcesses,
  apiCreateGroupProcess,
  apiUpdateGroupProcess,
  apiDeleteGroupProcess,
  apiRequestUploadProcessImage,
  apiRemoveProcessImage,
} from "scenes/orders/redux/api";
import { apiGetUserList } from "scenes/users/redux/api";
import { IResUser } from "scenes/users/redux/types";
import { enqueueSnackbar } from "notistack";
import { format, parseISO } from "date-fns";

// ─── Constants ────────────────────────────────────────────────────────────────

const PROCESS_TYPES = [
  "Cắt",
  "Tráng phủ",
  "Bồi",
  "Bế",
  "Ép kim",
  "Gia công khác",
];

const PROCESS_SUBTYPES: Record<string, string[]> = {
  "Tráng phủ": ["Cán màng", "UV"],
  Bồi: ["Bồi cứng", "Bồi mềm"],
  Bế: ["Bế thường", "Bế phức tạp"],
  "Ép kim": ["Ép kim nóng", "Ép kim lạnh"],
};

const PROCESS_STATUS_LABELS: Record<
  number,
  { text: string; color: LabelColor }
> = {
  0: { text: "Chờ xử lý", color: "default" },
  1: { text: "Đang làm", color: "info" },
  2: { text: "Hoàn thành", color: "success" },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type IProcessFormState = {
  process_type: string;
  process_subtype: string;
  assigned_user_id: string;
  received_at: string;
  completed_at: string;
  status: number;
  sort_order: number;
  notes: string;
};

const EMPTY_FORM: IProcessFormState = {
  process_type: PROCESS_TYPES[0],
  process_subtype: "",
  assigned_user_id: "",
  received_at: "",
  completed_at: "",
  status: 0,
  sort_order: 0,
  notes: "",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDt = (iso: string | null): string => {
  if (!iso) return "—";
  try {
    return format(parseISO(iso), "dd/MM/yyyy HH:mm");
  } catch {
    return iso;
  }
};

const toInputDatetime = (iso: string | null): string => {
  if (!iso) return "";
  try {
    // datetime-local needs "YYYY-MM-DDTHH:MM"
    return format(parseISO(iso), "yyyy-MM-dd'T'HH:mm");
  } catch {
    return "";
  }
};

// ─── Sub-component: ProcessCard ───────────────────────────────────────────────

type ProcessCardProps = {
  process: IProductionProcess;
  groupId: number;
  canEdit: boolean;
  onEdit: (p: IProductionProcess) => void;
  onDelete: (p: IProductionProcess) => void;
  onImagesChanged: (processId: number, images: string[]) => void;
  onImageRemoved: (processId: number, imageName: string) => void;
};

const ProcessCard: FC<ProcessCardProps> = ({
  process,
  groupId,
  canEdit,
  onEdit,
  onDelete,
  onImagesChanged,
  onImageRemoved,
}) => {
  const [uploading, setUploading] = useState(false);
  const [removingImage, setRemovingImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const statusInfo =
    PROCESS_STATUS_LABELS[process.status] ?? PROCESS_STATUS_LABELS[0];

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!file) return;
      setUploading(true);
      try {
        const mimeType = file.type || "image/jpeg";
        const res = await apiRequestUploadProcessImage(
          groupId,
          process.id,
          file.name || "upload.jpg",
          mimeType
        );
        if (res?.data?.upload_url) {
          // Use the content_type returned by the server (matches what was signed)
          // instead of guessing from the filename, to avoid S3 400 errors.
          const resolvedContentType = res.data.content_type || mimeType;
          const ok = await uploadImageToAwsWithType(
            res.data.upload_url,
            file,
            resolvedContentType
          );
          if (ok) {
            // Refresh images list by re-fetching the process
            const updatedRes = await apiGetGroupProcesses(groupId);
            if (updatedRes?.data) {
              const updated = updatedRes.data.find((p) => p.id === process.id);
              if (updated) {
                onImagesChanged(process.id, updated.images ?? []);
              }
            }
            enqueueSnackbar("Tải hình ảnh thành công", { variant: "success" });
          } else {
            enqueueSnackbar("Tải hình ảnh thất bại, vui lòng thử lại", {
              variant: "error",
            });
          }
        }
      } catch (err) {
        console.error(err);
        enqueueSnackbar("Có lỗi khi tải hình ảnh", { variant: "error" });
      } finally {
        setUploading(false);
      }
    },
    [groupId, process.id, onImagesChanged]
  );

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
    // reset so same file can be re-picked
    e.target.value = "";
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) handleFileUpload(file);
    },
    [handleFileUpload]
  );

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 1.5,
        mb: 1.5,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.background.paper
            : theme.palette.grey[800],
      }}
    >
      {/* Header row */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
      >
        <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
          <Label color="primary">{process.process_type}</Label>
          {process.process_subtype && (
            <Label color="secondary">{process.process_subtype}</Label>
          )}
          <Label color={statusInfo.color}>{statusInfo.text}</Label>
          {process.assigned_user && (
            <Typography variant="caption" color="text.secondary">
              👤 {process.assigned_user.first_name}{" "}
              {process.assigned_user.last_name}
            </Typography>
          )}
        </Stack>

        {canEdit && (
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Chỉnh sửa">
              <IconButton size="small" onClick={() => onEdit(process)}>
                <Iconify icon="mdi:pencil-outline" width={16} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(process)}
              >
                <Iconify icon="mdi:trash-can-outline" width={16} />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </Stack>

      {/* Times & notes row */}
      <Stack direction="row" spacing={2} sx={{ mt: 0.75 }} flexWrap="wrap">
        {process.received_at && (
          <Typography variant="caption" color="text.secondary">
            Nhận: {formatDt(process.received_at)}
          </Typography>
        )}
        {process.completed_at && (
          <Typography variant="caption" color="text.secondary">
            Xong: {formatDt(process.completed_at)}
          </Typography>
        )}
      </Stack>

      {process.notes && (
        <Typography
          variant="body2"
          sx={{ mt: 0.5, color: "text.secondary", fontStyle: "italic" }}
        >
          {process.notes}
        </Typography>
      )}

      {/* Images + upload zone */}
      <Box
        sx={{ mt: 1 }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
          {(process.images ?? []).map((img) => (
            <Box
              key={img}
              sx={{ position: "relative", display: "inline-flex" }}
              className="img-wrap"
            >
              <ImagePopup
                url={[getImageToAws(img)]}
                width={64}
                height={64}
                sx={{ borderRadius: 1, overflow: "hidden", cursor: "pointer" }}
              />
              {canEdit && (
                <Tooltip title="Xóa hình">
                  <IconButton
                    size="small"
                    disabled={removingImage === img}
                    onClick={async () => {
                      setRemovingImage(img);
                      try {
                        const res = await apiRemoveProcessImage(
                          groupId,
                          process.id,
                          img
                        );
                        if (res?.data) {
                          onImageRemoved(process.id, img);
                          enqueueSnackbar("Đã xóa hình ảnh", {
                            variant: "success",
                          });
                        }
                      } catch (err) {
                        console.error(err);
                        enqueueSnackbar("Xóa hình ảnh thất bại", {
                          variant: "error",
                        });
                      } finally {
                        setRemovingImage(null);
                      }
                    }}
                    sx={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      width: 18,
                      height: 18,
                      bgcolor: "error.main",
                      color: "common.white",
                      "&:hover": { bgcolor: "error.dark" },
                      "&.Mui-disabled": { bgcolor: "action.disabled" },
                    }}
                  >
                    {removingImage === img ? (
                      <CircularProgress size={10} color="inherit" />
                    ) : (
                      <Iconify icon="mdi:close" width={12} />
                    )}
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          ))}

          {canEdit && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFilePick}
              />
              <Tooltip title="Thêm hình ảnh (hoặc kéo thả / dán)">
                <IconButton
                  size="small"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  sx={{
                    border: "1px dashed",
                    borderColor: "divider",
                    borderRadius: 1,
                    width: 64,
                    height: 64,
                  }}
                >
                  {uploading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Iconify icon="mdi:image-plus-outline" width={24} />
                  )}
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

type IProps = {
  groupId: number;
  canEdit?: boolean;
};

const ProductionProcessPanel: FC<IProps> = ({ groupId, canEdit = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [processes, setProcesses] = useState<IProductionProcess[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProcess, setEditingProcess] =
    useState<IProductionProcess | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<IProcessFormState>(EMPTY_FORM);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [userList, setUserList] = useState<IResUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // Load user list lazily when the dialog is first opened
  React.useEffect(() => {
    if (!dialogOpen || userList.length > 0) return;
    setUsersLoading(true);
    apiGetUserList()
      .then((res) => {
        if (res?.data) setUserList(res.data);
      })
      .finally(() => setUsersLoading(false));
  }, [dialogOpen]);

  // Paste support - attach to dialog when open
  const handleGlobalPaste = useCallback(
    async (e: ClipboardEvent) => {
      if (!dialogOpen) return;
      const file = e.clipboardData?.items?.[0]?.getAsFile();
      if (file && file.type.startsWith("image/")) {
        if (editingProcess) {
          // paste into existing process upload
          setUploading(true);
          try {
            const mimeType = file.type || "image/jpeg";
            const res = await apiRequestUploadProcessImage(
              groupId,
              editingProcess.id,
              file.name || "paste.jpg",
              mimeType
            );
            if (res?.data?.upload_url) {
              const resolvedContentType = res.data.content_type || mimeType;
              await uploadImageToAwsWithType(
                res.data.upload_url,
                file,
                resolvedContentType
              );
              enqueueSnackbar("Tải hình ảnh thành công", {
                variant: "success",
              });
              await loadProcesses();
            }
          } finally {
            setUploading(false);
          }
        }
      }
    },
    [dialogOpen, editingProcess, groupId]
  );

  const [, setUploading] = useState(false);

  React.useEffect(() => {
    document.addEventListener("paste", handleGlobalPaste);
    return () => document.removeEventListener("paste", handleGlobalPaste);
  }, [handleGlobalPaste]);

  const loadProcesses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiGetGroupProcesses(groupId);
      if (res?.data) {
        setProcesses(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  const handleExpand = (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
    if (isExpanded && processes.length === 0) {
      loadProcesses();
    }
  };

  const openAddDialog = () => {
    setEditingProcess(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEditDialog = (p: IProductionProcess) => {
    setEditingProcess(p);
    setForm({
      process_type: p.process_type,
      process_subtype: p.process_subtype ?? "",
      assigned_user_id: p.assigned_user_id ? String(p.assigned_user_id) : "",
      received_at: toInputDatetime(p.received_at),
      completed_at: toInputDatetime(p.completed_at),
      status: p.status,
      sort_order: p.sort_order,
      notes: p.notes ?? "",
    });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingProcess(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: IReqCreateProcess = {
        process_type: form.process_type,
        process_subtype: form.process_subtype || undefined,
        assigned_user_id: form.assigned_user_id
          ? Number(form.assigned_user_id)
          : undefined,
        received_at: form.received_at || undefined,
        completed_at: form.completed_at || undefined,
        status: form.status,
        sort_order: form.sort_order,
        notes: form.notes || undefined,
      };

      if (editingProcess) {
        const res = await apiUpdateGroupProcess(
          groupId,
          editingProcess.id,
          payload
        );
        if (res?.data) {
          setProcesses((prev) =>
            prev.map((p) => (p.id === editingProcess.id ? res.data! : p))
          );
          enqueueSnackbar("Cập nhật quy trình thành công", {
            variant: "success",
          });
        }
      } else {
        const res = await apiCreateGroupProcess(groupId, payload);
        if (res?.data) {
          setProcesses((prev) => [...prev, res.data!]);
          enqueueSnackbar("Thêm quy trình thành công", { variant: "success" });
        }
      }
      handleDialogClose();
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Có lỗi xảy ra, vui lòng thử lại", { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p: IProductionProcess) => {
    setDeleteConfirmId(p.id);
  };

  const confirmDelete = async () => {
    if (deleteConfirmId == null) return;
    try {
      await apiDeleteGroupProcess(groupId, deleteConfirmId);
      setProcesses((prev) => prev.filter((p) => p.id !== deleteConfirmId));
      enqueueSnackbar("Đã xóa quy trình", { variant: "success" });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Xóa thất bại", { variant: "error" });
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleImagesChanged = (processId: number, images: string[]) => {
    setProcesses((prev) =>
      prev.map((p) => (p.id === processId ? { ...p, images } : p))
    );
  };

  const handleImageRemoved = (processId: number, imageName: string) => {
    setProcesses((prev) =>
      prev.map((p) =>
        p.id === processId
          ? {
              ...p,
              images: (p.images ?? []).filter((img) => img !== imageName),
            }
          : p
      )
    );
  };

  const subtypeOptions = PROCESS_SUBTYPES[form.process_type] ?? [];

  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={handleExpand}
        disableGutters
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "8px !important",
          mt: 1,
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<Iconify icon="mdi:chevron-down" width={20} />}
          sx={{ minHeight: 40, py: 0 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="mdi:cog-outline" width={18} color="text.secondary" />
            <Typography variant="subtitle2" color="text.secondary">
              Quy trình gia công
            </Typography>
            {processes.length > 0 && (
              <Label color="info" sx={{ ml: 0.5 }}>
                {processes.length}
              </Label>
            )}
          </Stack>
        </AccordionSummary>

        <AccordionDetails sx={{ pt: 0.5, pb: 1.5, px: 1.5 }}>
          {loading ? (
            <Stack alignItems="center" sx={{ py: 2 }}>
              <CircularProgress size={24} />
            </Stack>
          ) : (
            <>
              {processes.length === 0 && (
                <Typography
                  variant="body2"
                  color="text.disabled"
                  sx={{ py: 1 }}
                >
                  Chưa có quy trình nào được thêm
                </Typography>
              )}

              {processes.map((p) => (
                <ProcessCard
                  key={p.id}
                  process={p}
                  groupId={groupId}
                  canEdit={canEdit}
                  onEdit={openEditDialog}
                  onDelete={handleDelete}
                  onImagesChanged={handleImagesChanged}
                  onImageRemoved={handleImageRemoved}
                />
              ))}

              {canEdit && (
                <Button
                  size="small"
                  startIcon={<Iconify icon="mdi:plus" width={16} />}
                  onClick={openAddDialog}
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                >
                  Thêm quy trình
                </Button>
              )}
            </>
          )}
        </AccordionDetails>
      </Accordion>

      {/* ── Add / Edit dialog ── */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingProcess ? "Chỉnh sửa quy trình" : "Thêm quy trình gia công"}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 0.5 }}>
            {/* Process type */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Loại quy trình *</InputLabel>
                <Select
                  value={form.process_type}
                  label="Loại quy trình *"
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      process_type: e.target.value,
                      process_subtype: "",
                    }))
                  }
                >
                  {PROCESS_TYPES.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Process subtype */}
            <Grid item xs={12} sm={6}>
              {subtypeOptions.length > 0 ? (
                <FormControl fullWidth size="small">
                  <InputLabel>Phân loại</InputLabel>
                  <Select
                    value={form.process_subtype}
                    label="Phân loại"
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        process_subtype: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="">
                      <em>Không có</em>
                    </MenuItem>
                    {subtypeOptions.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  label="Phân loại"
                  value={form.process_subtype}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, process_subtype: e.target.value }))
                  }
                />
              )}
            </Grid>

            {/* Status */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={form.status}
                  label="Trạng thái"
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: Number(e.target.value) }))
                  }
                >
                  {Object.entries(PROCESS_STATUS_LABELS).map(([val, info]) => (
                    <MenuItem key={val} value={Number(val)}>
                      {info.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Assigned user */}
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                size="small"
                loading={usersLoading}
                options={userList}
                getOptionLabel={(u) =>
                  `${u.first_name} ${u.last_name}`.trim() || u.username
                }
                isOptionEqualToValue={(opt, val) => opt.id === val.id}
                value={
                  userList.find(
                    (u) => String(u.id) === form.assigned_user_id
                  ) ?? null
                }
                onChange={(_e, user) =>
                  setForm((f) => ({
                    ...f,
                    assigned_user_id: user ? String(user.id) : "",
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nhân viên phụ trách"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {usersLoading && (
                            <CircularProgress size={16} sx={{ mr: 1 }} />
                          )}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            {/* Sort order */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Thứ tự"
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))
                }
                inputProps={{ min: 0 }}
              />
            </Grid>

            {/* Received at */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Thời gian nhận"
                type="datetime-local"
                value={form.received_at}
                onChange={(e) =>
                  setForm((f) => ({ ...f, received_at: e.target.value }))
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Completed at */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Thời gian hoàn thành"
                type="datetime-local"
                value={form.completed_at}
                onChange={(e) =>
                  setForm((f) => ({ ...f, completed_at: e.target.value }))
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Notes */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Ghi chú"
                multiline
                minRows={2}
                maxRows={4}
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose} color="inherit">
            Hủy
          </Button>
          <LoadingButton
            loading={saving}
            onClick={handleSave}
            variant="contained"
          >
            {editingProcess ? "Cập nhật" : "Thêm mới"}
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* ── Delete confirm dialog ── */}
      <Dialog
        open={deleteConfirmId != null}
        onClose={() => setDeleteConfirmId(null)}
        maxWidth="xs"
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc muốn xóa quy trình này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmId(null)} color="inherit">
            Hủy
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductionProcessPanel;
