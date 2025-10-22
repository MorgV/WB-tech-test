import { type User } from "../api/usersApi";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { GlowButton } from "../../../shared/UI";
import { useUserForm } from "../model/useUserForm";

type UserModalProps = {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "delete";
  user?: User;
};

export const UserModal = ({ open, onClose, mode, user }: UserModalProps) => {
  const { form, handleChange, handleSubmit, saving, error } = useUserForm(
    mode,
    user,
    onClose
  );

  const getTitle = () =>
    mode === "create"
      ? "Создать пользователя"
      : mode === "edit"
      ? "Редактировать пользователя"
      : "Удалить пользователя";

  const getSubmitText = () =>
    saving
      ? mode === "delete"
        ? "Удаляем..."
        : "Сохраняем..."
      : mode === "delete"
      ? "Удалить"
      : "Сохранить";

  const renderContent = () =>
    mode === "delete" ? (
      <Typography>
        Вы уверены, что хотите удалить <b>{user?.fullName}</b>?
      </Typography>
    ) : (
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        {["fullName", "email", "phone", "position", "avatar"].map((field) => (
          <TextField
            key={field}
            label={
              field === "fullName"
                ? "Имя"
                : field.charAt(0).toUpperCase() + field.slice(1)
            }
            name={field}
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            fullWidth
          />
        ))}
      </Box>
    );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{getTitle()}</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {renderContent()}
      </DialogContent>
      <DialogActions>
        <GlowButton
          variantColor="secondary"
          onClick={onClose}
          disabled={saving}
        >
          Отмена
        </GlowButton>
        <GlowButton
          onClick={handleSubmit}
          disabled={saving}
          variantColor={mode === "delete" ? "error" : "primary"}
          startIcon={saving && <CircularProgress size={20} />}
        >
          {getSubmitText()}
        </GlowButton>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
