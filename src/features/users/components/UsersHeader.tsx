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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            textShadow: "0 0 10px #ffe81f",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Список пользователей
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 1.5,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <GlowButton
            onClick={onCreate}
            sx={{
              width: { xs: "100%", sm: "auto" },
              py: 1.2,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Создать пользователя
          </GlowButton>

          <FormControl
            size="small"
            sx={{
              minWidth: 80,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Select
              value={usersPerPage}
              onChange={(e) => onChangeUsersPerPage(Number(e.target.value))}
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
