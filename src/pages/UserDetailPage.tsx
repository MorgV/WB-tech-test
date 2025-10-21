import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchUserById } from "../features/users/usersSlice";

const UserDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { current: user, loading, error } = useAppSelector((s) => s.users);

  useEffect(() => {
    if (id && (!user || user.id !== id)) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id, user]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Пользователь не найден</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3, display: "flex", gap: 3 }}>
        <Avatar
          src={user.avatar}
          alt={user.fullName}
          sx={{ width: 120, height: 120 }}
        />
        <Box>
          <Typography variant="h4">{user.fullName}</Typography>
          <Typography color="text.secondary">{user.position}</Typography>
          <Typography sx={{ mt: 1 }}>{user.email}</Typography>
          <Typography>{user.phone}</Typography>
        </Box>
      </Paper>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">О пользователе:</Typography>
        <Typography sx={{ mt: 1 }}>{user.about}</Typography>
      </Box>
    </Box>
  );
};

export default UserDetailPage;
