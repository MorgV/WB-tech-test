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
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchUsers } from "../features/users/usersSlice";
import UserModal from "../components/UserModal";
import { type User } from "../api/usersApi";

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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "delete">(
    "create"
  );
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

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
    setPage(1);
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
        <Button
          variant="contained"
          onClick={() => {
            setModalMode("create");
            setSelectedUser(undefined);
            setModalOpen(true);
          }}
        >
          Создать пользователя
        </Button>
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <InputLabel>На странице</InputLabel>
          <Select
            value={usersPerPage}
            label="На странице"
            onChange={handleChangeUsersPerPage}
          >
            {[5, 10, 15, 20, 50].map((num) => (
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
                {[
                  "Аватар",
                  "Имя",
                  "Email",
                  "Телефон",
                  "Должность",
                  "Действия",
                ].map((title) => (
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
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  <TableCell>
                    <Avatar src={user.avatar} alt={user.fullName} />
                  </TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.position}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation(); // отключаем родительский onClick
                        setModalMode("edit");
                        setSelectedUser(user);
                        setModalOpen(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation(); // отключаем родительский onClick
                        setModalMode("delete");
                        setSelectedUser(user);
                        setModalOpen(true);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>

      {/* Footer / Pagination */}
      <Box
        sx={{ flexShrink: 0, display: "flex", justifyContent: "center", mt: 2 }}
      >
        <Pagination
          count={Math.ceil(users.length / usersPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>

      {/* User Modal */}
      <UserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        user={selectedUser}
      />
    </Box>
  );
};

export default UsersListPage;
