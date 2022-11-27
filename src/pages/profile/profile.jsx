import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

export const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.password);
  };

  const onCancel = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const onSubmit = (event) => {
    event.prevetDefault();
  };

  const navLinkClass = clsx(
    styles.link,
    "text text_type_main-default text_color_inactive",
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
        <Input value={name} placeholder="Имя" onChange={onChangeName} />
        <EmailInput value={email} onChange={onChangeEmail} />
        <PasswordInput value={password} onChange={onChangePassword} />
        <div className={(clsx(styles.form_actions), "align-self_end")}>
          <Button htmlType="button" type="secondary" onClick={onCancel}>
            Отмена
          </Button>
          <Button htmlType="submit">Сохранить</Button>
        </div>
      </form>
      <div className={styles.nav} />
    </main>
  );
};
