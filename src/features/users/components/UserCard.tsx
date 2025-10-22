// src/features/users/components/UserCard.tsx
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { StarBox } from "../../../shared/UI/StarBox";
import { StarAvatar } from "../../../shared/UI/StarAvatar";
import { type User } from "../api/usersApi";

type UserCardProps = { user: User };

export const UserCard = ({ user }: UserCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StarBox
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "center", sm: "flex-start" },
        textAlign: { xs: "center", sm: "left" },
        gap: { xs: 2, sm: 4 },
        width: "100%",
      }}
    >
      <StarAvatar
        src={user.avatar}
        alt={user.fullName}
        sx={{
          width: { xs: 100, sm: 140 },
          height: { xs: 100, sm: 140 },
          flexShrink: 0,
        }}
      />
      <div>
        <Typography variant={isMobile ? "h5" : "jediTitle"}>
          {user.fullName}
        </Typography>
        <Typography variant="body2">{user.position}</Typography>
        <Typography variant="lightText">{user.email}</Typography>
        <Typography variant="lightText">{user.phone}</Typography>
      </div>
    </StarBox>
  );
};
