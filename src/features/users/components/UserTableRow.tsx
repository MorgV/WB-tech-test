import { TableRow, TableCell, IconButton, Box } from "@mui/material";
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

const UserTableRowBase = ({
  user,
  onEdit,
  onDelete,
  onClick,
}: UserTableRowProps) => {
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
        <Box>
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
        </Box>
      </StarTableCell>
    </TableRow>
  );
};

// 👇 Мобильные кнопки справа
const MobileActions = ({
  onEdit,
  onDelete,
}: {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <Box sx={{ display: "flex", gap: 0.5 }}>
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        onEdit();
      }}
    >
      <Edit sx={{ color: "#ffe81f", fontSize: 20 }} />
    </IconButton>
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
    >
      <Delete sx={{ color: "#ff5555", fontSize: 20 }} />
    </IconButton>
  </Box>
);

export const UserTableRow = Object.assign(React.memo(UserTableRowBase), {
  MobileActions,
});
