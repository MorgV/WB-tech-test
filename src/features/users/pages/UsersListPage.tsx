import { useEffect, useState, useCallback, useMemo } from "react";
import { PageContainer } from "../../../shared/UI/PageContainer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import UserModal from "../components/UserModal";
import { UsersHeader } from "../components/UsersHeader";
import { UsersTable } from "../components/UsersTable";
import { fetchUsers } from "../model/usersSlice";
import { type User } from "../api/usersApi";
import { CircularProgress, Typography, Box } from "@mui/material";

const UsersListPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list: users = [], loading, error } = useAppSelector((s) => s.users);

  // Пагинация
  const [page, setPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  // Модалка
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "delete">(
    "create"
  );
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  // Загрузка пользователей
  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  // ======== Мемоизация модалки ========
  const openCreate = useCallback(() => {
    setModalMode("create");
    setSelectedUser(undefined);
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((user: User) => {
    setModalMode("edit");
    setSelectedUser(user);
    setModalOpen(true);
  }, []);

  const openDelete = useCallback((user: User) => {
    setModalMode("delete");
    setSelectedUser(user);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  // ======== Мемоизация пагинации ========
  const pagination = useMemo(
    () => ({
      page,
      usersPerPage,
      setPage,
      setUsersPerPage: (v: number) => {
        setUsersPerPage(v);
        setPage(1);
      },
    }),
    [page, usersPerPage]
  );

  const handleChangeUsersPerPage = useCallback(
    (v: number) => pagination.setUsersPerPage(v),
    [pagination]
  );

  // ======== SPA-переход по клику на строку ========
  const onRowClick = useCallback(
    (user: User) => navigate(`/users/${user.id}`, { replace: false }),
    [navigate]
  );

  // ======== Конфиг таблицы ========
  const tableConfig = useMemo(
    () => ({
      pagination,
      handlers: { onRowClick, onEdit: openEdit, onDelete: openDelete },
    }),
    [pagination, onRowClick, openEdit, openDelete]
  );

  return (
    <PageContainer>
      {/* Header */}
      <UsersHeader
        usersPerPage={usersPerPage}
        onChangeUsersPerPage={handleChangeUsersPerPage}
        onCreate={openCreate}
      />

      {/* Лоадер */}
      {loading && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}

      {/* Ошибка */}
      {error && (
        <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
          {error}
        </Typography>
      )}

      {/* Таблица */}
      {!loading && !error && <UsersTable users={users} config={tableConfig} />}

      {/* Модалка */}
      <UserModal
        open={modalOpen}
        onClose={closeModal}
        mode={modalMode}
        user={selectedUser}
      />
    </PageContainer>
  );
};

export default UsersListPage;
