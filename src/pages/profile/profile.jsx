import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/auth-hook";
import { fetchUserPatch } from "../../services/actions/auth-actions";
import styles from "./styles.module.css";

export const Profile = () => {
  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const {
    name,
    email,
    password,
    handleChangeNameEvent,
    handleChangeEmailEvent,
    handleChangePasswordEvent,
    clearProfile,
  } = useAuth(user);

  const onSubmit = (event) => {
    event.preventDefault();
    const body = Object.assign({ name, email }, password ? { password } : {});
    // const body = { email, name, password: "123456" };
    console.log("submit", body);
    dispatch(fetchUserPatch(body));
  };

  const onReset = (event) => {
    event.preventDefault();
    clearProfile();
  };

  const navLinkClass = clsx(
    styles.link,
    "text text_type_main-medium text_color_inactive",
    "flex row align-items_center justify-items_start"
  );
  const navLinkStyle = ({ isActive }) =>
    isActive ? { color: "white" } : undefined;

  return (
    <main
      className={clsx(styles.container, "flex row align-items_start gap-15")}
    >
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <NavLink
              className={navLinkClass}
              style={navLinkStyle}
              to="/profile"
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink className={navLinkClass} style={navLinkStyle} to="orders">
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink className={navLinkClass} style={navLinkStyle} to="/">
              Выход
            </NavLink>
          </li>
        </ul>
        <div className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </nav>

      <form
        className="flex column align-items_center gap-6"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <Input
          value={name}
          placeholder="Имя"
          icon="EditIcon"
          onChange={handleChangeNameEvent}
        />
        <EmailInput
          value={email}
          icon="EditIcon"
          onChange={handleChangeEmailEvent}
        />
        <PasswordInput
          value={password}
          icon="EditIcon"
          onChange={handleChangePasswordEvent}
        />
        <div className={(clsx(styles.form_actions), "align-self_end")}>
          <Button htmlType="reset" type="secondary">
            Отмена
          </Button>
          <Button htmlType="submit">Сохранить</Button>
        </div>
      </form>
      <div className={styles.nav} />
    </main>
  );
};
