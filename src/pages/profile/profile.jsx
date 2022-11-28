import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useProfile } from "../../hooks/profile-hook";
import styles from "./styles.module.css";

export const Profile = () => {
  const profile = useSelector((store) => store.profileReducer);
  // TODO: use dispatch to update profile info
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const {
    name,
    email,
    password,
    handleChangeNameEvent,
    handleChangeEmailEvent,
    handleChangePasswordEvent,
    clearProfile,
  } = useProfile({
    name: profile.name,
    email: profile.email,
    password: profile.password,
  });
  const onSubmit = (event) => {
    event.preventDefault();
    //dispatch(update profile)
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
            <NavLink className={navLinkClass} style={navLinkStyle} to="history">
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
          <Button htmlType="button" type="secondary" onClick={clearProfile}>
            Отмена
          </Button>
          <Button htmlType="submit">Сохранить</Button>
        </div>
      </form>
      <div className={styles.nav} />
    </main>
  );
};
