import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { GlowButton } from "../../../shared/UI/GlowButton";
import React from "react";

type UsersHeaderProps = {
  usersPerPage: number;
  onChangeUsersPerPage: (value: number) => void;
  onCreate: () => void;
};

export const UsersHeader = React.memo(
  ({ usersPerPage, onChangeUsersPerPage, onCreate }: UsersHeaderProps) => {
    console.log("Render header");
    return (
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
        <Typography
          variant="h4"
          sx={{ flexGrow: 1, textShadow: "0 0 10px #ffe81f" }}
        >
          Список пользователей
        </Typography>

        <GlowButton onClick={onCreate}>Создать пользователя</GlowButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FormControl size="small">
            <Select
              value={usersPerPage}
              onChange={(e) => onChangeUsersPerPage(Number(e.target.value))}
              sx={{ minWidth: 60 }}
            >
              {[5, 10, 20, 50].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    );
  }
);
