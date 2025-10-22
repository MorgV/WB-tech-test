import { memo, useMemo } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Box,
  Pagination,
} from "@mui/material";
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

  const paginatedUsers = useMemo(
    () =>
      users.slice(
        (pagination.page - 1) * pagination.usersPerPage,
        pagination.page * pagination.usersPerPage
      ),
    [users, pagination.page, pagination.usersPerPage]
  );

  console.log("render table");

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {["Аватар", "Имя", "Email", "Телефон", "Должность", "Действия"].map(
              (title) => (
                <StarTableCell key={title}>{title}</StarTableCell>
              )
            )}
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
