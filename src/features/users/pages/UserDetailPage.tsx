import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Typography, IconButton, Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { PageContainer } from "../../../shared/UI/PageContainer";
import { fetchUserById } from "../model/usersSlice";
import { UserCard } from "../components/UserCard";
import { StarBox } from "../../../shared/UI";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { current: user, loading, error } = useAppSelector((s) => s.users);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    if (user?.id === id) return;
    setLoadingId(id);

    dispatch(fetchUserById(id)).finally(() => setLoadingId(null));
  }, [dispatch, id]);

  const renderContent = () => {
    if (loading || loadingId === id) {
      return <CircularProgress sx={{ mt: 8, alignSelf: "center" }} />;
    }

    if (error) return <Typography color="error">{error}</Typography>;
    if (!user) return <Typography>Пользователь не найден</Typography>;

    return (
      <>
        <UserCard user={user} />
        <StarBox sx={{ mt: 2, p: 2 }}>
          <Typography variant="h6">О пользователе:</Typography>
          <Typography>
            {user.about || "Нет дополнительной информации."}
          </Typography>
        </StarBox>
      </>
    );
  };

  return (
    <PageContainer>
      {/* Стрелка назад */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1 }}>
          Детали пользователя
        </Typography>
      </Box>

      {renderContent()}
    </PageContainer>
  );
};

export default UserDetailPage;
