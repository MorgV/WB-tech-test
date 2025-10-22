import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { createUser, updateUser, deleteUser } from "../model/usersSlice";
import { type User } from "../api/usersApi";

export const useUserForm = (
  mode: "create" | "edit" | "delete",
  user?: User,
  onClose?: () => void
) => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    avatar: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && user)
      setForm({ ...user, avatar: user.avatar || "" });
    else
      setForm({ fullName: "", email: "", phone: "", position: "", avatar: "" });
    setError(null);
  }, [mode, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);
    try {
      if (mode === "create") await dispatch(createUser(form)).unwrap();
      else if (mode === "edit" && user)
        await dispatch(updateUser({ id: user.id, data: form })).unwrap();
      else if (mode === "delete" && user)
        await dispatch(deleteUser(user.id)).unwrap();
      onClose?.();
    } catch (err: any) {
      setError(err?.message || "Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  return { form, handleChange, handleSubmit, saving, error };
};
