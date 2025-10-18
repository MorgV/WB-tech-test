import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const UserDetailPage = () => {
  const { id } = useParams();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Пользователь {id}</Typography>
      <Typography sx={{ mt: 2 }}>
        Здесь будет детальная информация о пользователе.
      </Typography>
    </Box>
  );
};

export default UserDetailPage;
