import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { PageContainer } from "../../../shared/UI/PageContainer";
import { StarBox } from "../../../shared/UI/StarBox";
import { StarAvatar } from "../../../shared/UI/StarAvatar";
import { fetchUserById } from "../model/usersSlice";

const UserDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { current: user, loading, error } = useAppSelector((s) => s.users);

  useEffect(() => {
    if (id && (!user || user.id !== id)) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id, user]);

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

  if (!user) {
    return (
      <PageContainer>
        <Typography variant="h5" sx={{ color: "#ffe81f" }}>
          Пользователь не найден
        </Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <StarBox
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          p: 4,
          borderRadius: 4,
          border: "1px solid rgba(255, 232, 31, 0.4)",
          background: "rgba(255, 255, 255, 0.05)",
          boxShadow: "0 0 20px rgba(255, 232, 31, 0.1)",
          transition: "0.3s",
          "&:hover": {
            boxShadow: "0 0 25px rgba(255, 232, 31, 0.3)",
          },
        }}
      >
        <StarAvatar
          src={user.avatar}
          alt={user.fullName}
          sx={{ width: 140, height: 140 }}
        />
        <div>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Star Jedi', sans-serif",
              color: "#ffe81f",
              textShadow: "0 0 10px #ffe81f",
            }}
          >
            {user.fullName}
          </Typography>
          <Typography
            sx={{
              color: "#aaa",
              fontSize: "1.1rem",
              mb: 1,
            }}
          >
            {user.position}
          </Typography>
          <Typography sx={{ color: "#fff" }}>{user.email}</Typography>
          <Typography sx={{ color: "#fff" }}>{user.phone}</Typography>
        </div>
      </StarBox>

      <StarBox sx={{ mt: 4, p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Star Jedi', sans-serif",
            color: "#ffe81f",
            textShadow: "0 0 8px #ffe81f",
            mb: 1,
          }}
        >
          О пользователе:
        </Typography>
        <Typography sx={{ color: "#e0e0e0" }}>
          {user.about || "Нет дополнительной информации."}
        </Typography>
      </StarBox>
    </PageContainer>
  );
};

export default UserDetailPage;
