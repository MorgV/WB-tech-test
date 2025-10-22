// src/features/users/components/UserTableRow.tsx
import { TableRow, TableCell, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { StarAvatar } from "../../../shared/UI/StarAvatar";
import { StarTableCell } from "../../../shared/UI/StarTableCell";
import { type User } from "../api/usersApi";
import React from "react";

type UserTableRowProps = {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
  onClick: () => void;
};
export const UserTableRow = React.memo(
  ({ user, onEdit, onDelete, onClick }: UserTableRowProps) => {
    console.log("Rendering UserTableRow:", user.id);

    return (
      <TableRow
        hover
        onClick={onClick}
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
              onEdit();
            }}
          >
            <Edit sx={{ color: "#ffe81f" }} />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Delete sx={{ color: "#ff5555" }} />
          </IconButton>
        </StarTableCell>
      </TableRow>
    );
  }
);
