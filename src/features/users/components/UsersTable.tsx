import { memo, useMemo } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Box,
  Pagination,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { StarTableCell } from "../../../shared/UI/StarTableCell";
import { UserTableRow } from "./UserTableRow";
import { type User } from "../api/usersApi";

type UsersTableHandlers = {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onRowClick: (user: User) => void;
};

type UsersTablePagination = {
  page: number;
  usersPerPage: number;
  setPage: (v: number) => void;
};

type UsersTableConfig = {
  handlers: UsersTableHandlers;
  pagination: UsersTablePagination;
};

type UsersTableProps = {
  users: User[];
  config: UsersTableConfig;
};

export const UsersTable = memo(({ users = [], config }: UsersTableProps) => {
  const { handlers, pagination } = config;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const paginatedUsers = useMemo(
    () =>
      users.slice(
        (pagination.page - 1) * pagination.usersPerPage,
        pagination.page * pagination.usersPerPage
      ),
    [users, pagination.page, pagination.usersPerPage]
  );

  return (
    <>
      {!isMobile ? (
        // 💻 TABLE VIEW
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
              <UserTableRow
                key={user.id}
                user={user}
                onClick={() => handlers.onRowClick(user)}
                onEdit={() => handlers.onEdit(user)}
                onDelete={() => handlers.onDelete(user)}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        // 📱 MOBILE CARD VIEW
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {paginatedUsers.map((user) => (
            <Box
              key={user.id}
              onClick={() => handlers.onRowClick(user)}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
                boxShadow: "0 0 10px rgba(255,232,31,0.1)",
              }}
            >
              {/* Верхняя строка: имя + кнопки справа */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "70%",
                  }}
                >
                  {user.fullName}
                </Typography>
                <UserTableRow.MobileActions
                  user={user}
                  onEdit={() => handlers.onEdit(user)}
                  onDelete={() => handlers.onDelete(user)}
                />
              </Box>

              {/* Остальная информация */}
              <Typography variant="body2">📧 {user.email}</Typography>
              <Typography variant="body2">📞 {user.phone}</Typography>
              <Typography variant="body2">💼 {user.position}</Typography>
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(users.length / pagination.usersPerPage)}
          page={pagination.page}
          onChange={(_, value) => pagination.setPage(value)}
          color="primary"
        />
      </Box>
    </>
  );
});
