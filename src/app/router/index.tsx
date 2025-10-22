// src/app/router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersListPage from "../../features/users/pages/UsersListPage";
import UserDetailPage from "../../features/users/pages/UserDetailPage";
import StarBackground from "../../shared/UI/StarBackground";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <StarBackground>
              <UsersListPage />
            </StarBackground>
          }
        />
        <Route
          path="/users/:id"
          element={
            <StarBackground>
              <UserDetailPage />
            </StarBackground>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
