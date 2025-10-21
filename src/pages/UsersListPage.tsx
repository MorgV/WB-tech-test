import { useEffect, useState } from "react";
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
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme,
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

  const [page, setPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeUsersPerPage = (event: any) => {
    setUsersPerPage(event.target.value);
    setPage(1); // сбрасываем на первую страницу при смене
  };

  const paginatedUsers = users.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

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
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        p: isMobile ? 1 : 4,
      }}
    >
      {/* Header */}
      <Box
        sx={{ flexShrink: 0, mb: 2, display: "flex", gap: 2, flexWrap: "wrap" }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Список пользователей
        </Typography>
        <Button variant="contained">Создать пользователя</Button>
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <InputLabel>На странице</InputLabel>
          <Select
            value={usersPerPage}
            label="На странице"
            onChange={handleChangeUsersPerPage}
          >
            {[5, 10, 20, 50].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Users Table */}
      <Box sx={{ flex: 1, overflowY: "auto", mt: 2 }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: isMobile ? 500 : 650 }}>
            <TableHead>
              <TableRow>
                {["Аватар", "Имя", "Email", "Телефон", "Должность"].map(
                  (title) => (
                    <TableCell
                      key={title}
                      sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "background.paper",
                        zIndex: 10,
                      }}
                    >
                      {title}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
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
      </Box>

      {/* Footer / Pagination */}
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Pagination
          count={Math.ceil(users.length / usersPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default UsersListPage;
