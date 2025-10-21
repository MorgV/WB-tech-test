// src/pages/UsersListPage.tsx
import { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import UserModal from "../components/UserModal";
import { type User } from "../api/usersApi";
import { PageContainer } from "../../../shared/UI/PageContainer";
import { GlowButton } from "../../../shared/UI/GlowButton";
import { StarTableCell } from "../../../shared/UI/StarTableCell";
import { StarAvatar } from "../../../shared/UI/StarAvatar";
import { StarBox } from "../../../shared/UI/StarBox";
import { fetchUsers } from "../model/usersSlice";

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

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeUsersPerPage = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setUsersPerPage(Number(event.target.value));
    setPage(1);
  };

  const paginatedUsers = users.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  if (loading) {
    return (
      <PageContainer>
        <CircularProgress sx={{ alignSelf: "center", mt: 8 }} />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Typography color="error">{error}</Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            fontFamily: "'Star Jedi', sans-serif",
            color: "#ffe81f",
            textShadow: "0 0 10px #ffe81f",
          }}
        >
          Список пользователей
        </Typography>

        <GlowButton
          onClick={() => {
            setModalMode("create");
            setSelectedUser(undefined);
            setModalOpen(true);
          }}
        >
          Создать пользователя
        </GlowButton>

        <FormControl size="small">
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

      {/* Table */}
      <StarBox sx={{ flex: 1, overflowY: "auto" }}>
        <Table>
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
                <StarTableCell key={title}>{title}</StarTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                hover
                onClick={() => navigate(`/users/${user.id}`)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(255, 232, 31, 0.05)",
                    transition: "0.2s",
                  },
                }}
              >
                <TableCell>
                  <StarAvatar src={user.avatar} alt={user.fullName} />
                </TableCell>
                <StarTableCell>{user.fullName}</StarTableCell>
                <StarTableCell>{user.email}</StarTableCell>
                <StarTableCell>{user.phone}</StarTableCell>
                <StarTableCell>{user.position}</StarTableCell>
                <StarTableCell>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalMode("edit");
                      setSelectedUser(user);
                      setModalOpen(true);
                    }}
                  >
                    <Edit sx={{ color: "#ffe81f" }} />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalMode("delete");
                      setSelectedUser(user);
                      setModalOpen(true);
                    }}
                  >
                    <Delete sx={{ color: "#ff5555" }} />
                  </IconButton>
                </StarTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StarBox>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(users.length / usersPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>

      {/* Modal */}
      <UserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        user={selectedUser}
      />
    </PageContainer>
  );
};

export default UsersListPage;
