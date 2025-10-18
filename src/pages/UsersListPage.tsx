import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UsersListPage = () => {
  const navigate = useNavigate();
  const [users] = useState([
    {
      id: "1",
      fullName: "Иван Иванов",
      email: "ivan@mail.com",
      position: "Frontend",
    },
    {
      id: "2",
      fullName: "Мария Петрова",
      email: "maria@mail.com",
      position: "Backend",
    },
  ]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Список пользователей
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }}>
        Создать пользователя
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Должность</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => navigate(`/users/${user.id}`)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UsersListPage;
