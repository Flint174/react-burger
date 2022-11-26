import { useState } from "react";
import styles from "./styles.module.css";
import { clsx } from "clsx";
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const Register = () => {
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
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    /**
     * TODO: send form
     */
  };

  return (
    <main
      className={clsx(
        styles.container,
        "flex column align-items_center justify-items_start"
      )}
    >
      <h1 className="text text_type_main-medium">Вход</h1>
      <form
        className="flex column align-items_center gap-6 mt-6 mb-20"
        onSubmit={onSubmit}
      >
        <EmailInput value={name} onChange={onChangeName} inputMode="text" />
        <EmailInput value={email} onChange={onChangeEmail} />
        <PasswordInput value={password} onChange={onChangePassword} />
        <Button htmlType="submit" extraClass={styles.btn}>
          Зарегистрироваться
        </Button>
      </form>
      <p
        className={clsx(
          styles.p,
          "text text_type_main-default text_color_inactive"
        )}
      >
        Уже зарегистрированы?{" "}
        <span>
          {/* TODO: link to... */}
          <Link>Войти</Link>
        </span>
      </p>
    </main>
  );
};
