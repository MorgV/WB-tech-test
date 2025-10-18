// src/app/router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersListPage from "../pages/UsersListPage";
import UserDetailPage from "../pages/UserDetailPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersListPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};
