import { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchUsers } from "../features/users/usersSlice";

const UsersListPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    list: users,
    loading,
    error,
  } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (!users.length) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

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

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Список пользователей
      </Typography>

      <Button variant="contained" sx={{ mb: 3 }}>
        Создать пользователя
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Аватар</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Телефон</TableCell>
            <TableCell>Должность</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              hover
              onClick={() => navigate(`/users/${user.id}`)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>
                <Avatar src={user.avatar} alt={user.fullName} />
              </TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UsersListPage;
