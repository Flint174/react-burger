import { AppHeader } from "../app-header";
import { fetchIngredients } from "../../services/actions/ingredients-actions";
import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Main } from "../../pages/main";
import { Login } from "../../pages/login/login";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { Register } from "../../pages/register/register";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { PageNotFound } from "../../pages/page-not-found";
import { Profile } from "../../pages/profile/profile";
import { ProtectedRoute } from "../protected-route";
import { fetchUserGet } from "../../services/actions/auth-actions";
import { ProfileForm } from "../../pages/profile/profile-form";
import { getCookie } from "../../utils/cookie";
import { ACCESS_TOKEN } from "../../utils/constants";
import { IngredientDetails } from "../ingredient-details";
import { Modal } from "../modal";
import { useAppDispatch, useAppSelector } from "../../hooks/use-store";

export const App = () => {
  const { user } = useAppSelector((store) => store.authReducer);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchIngredients());
    if (getCookie(ACCESS_TOKEN)) {
      dispatch(fetchUserGet());
    }
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route index element={<Main />} />
        <Route element={<ProtectedRoute isAllowed={!user} redirectPath="/" />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="profile" element={<Profile />}>
            <Route path="" element={<ProfileForm />} />
            <Route path="orders" element={<></>} />
          </Route>
        </Route>
        <Route
          path="/ingredients/:id"
          element={
            <Modal title="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
