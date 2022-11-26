import { AppHeader } from "../app-header";
import { fetchIngredietns } from "../../services/actions/ingredients-actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Main } from "../../pages/Main";
import { Login } from "../../pages/Login/Login";
import { ForgotPassword } from "../../pages/ForgotPassword";
import { Register } from "../../pages/Register";
import { ResetPassword } from "../../pages/ResetPassword";
import { IngredientsModal } from "../../pages/IngredientsModal";
import { PageNotFound } from "../../pages/PageNotFound";
import { Profile } from "../../pages/Profile";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredietns());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route index element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="profile" element={<Profile />} />
        <Route path="ingredients/:id" element={<IngredientsModal />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
