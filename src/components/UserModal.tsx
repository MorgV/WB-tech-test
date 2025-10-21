import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import {
  createUser,
  updateUser,
  deleteUser,
} from "../features/users/usersSlice";
import { type User } from "../api/usersApi";

type UserModalProps = {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "delete";
  user?: User;
};

const UserModal = ({ open, onClose, mode, user }: UserModalProps) => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    avatar: "",
  });

  useEffect(() => {
    if (mode === "edit" && user) {
      setForm({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        position: user.position,
        avatar: user.avatar || "",
      });
    } else if (mode === "create") {
      setForm({ fullName: "", email: "", phone: "", position: "", avatar: "" });
    }
  }, [mode, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (mode === "create") {
      await dispatch(createUser(form));
    } else if (mode === "edit" && user) {
      await dispatch(updateUser({ id: user.id, data: form }));
    } else if (mode === "delete" && user) {
      await dispatch(deleteUser(user.id));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === "create" && "Создать пользователя"}
        {mode === "edit" && "Редактировать пользователя"}
        {mode === "delete" && "Удалить пользователя"}
      </DialogTitle>

      <DialogContent dividers>
        {mode === "delete" ? (
          <Typography>
            Вы уверены, что хотите удалить пользователя <b>{user?.fullName}</b>?
          </Typography>
        ) : (
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
            }}
          >
            <TextField
              label="Имя"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Телефон"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Должность"
              name="position"
              value={form.position}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Avatar URL"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button
          onClick={handleSubmit}
          color={mode === "delete" ? "error" : "primary"}
          variant="contained"
        >
          {mode === "delete" ? "Удалить" : "Сохранить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
