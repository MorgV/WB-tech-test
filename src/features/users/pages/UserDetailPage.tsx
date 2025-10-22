import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Typography, IconButton, Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { usersApi, type User } from "../api/usersApi";
import { PageContainer } from "../../../shared/UI/PageContainer";
import { UserCard } from "../components/UserCard";
import { StarBox } from "../../../shared/UI";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    usersApi
      .getById(id)
      .then((data) => {
        setUser(data);
        setError(null);
      })
      .catch(() => setError("Не удалось загрузить пользователя"))
      .finally(() => setLoading(false));
  }, [id]);

  const renderContent = () => {
    if (loading)
      return <CircularProgress sx={{ mt: 8, alignSelf: "center" }} />;
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
