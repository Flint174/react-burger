import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "../../components/form/form";
import styles from "./styles.module.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const form = <EmailInput value={email} onChange={onChangeEmail} />;
  const footer = (
    <p className={styles.p}>
      Вспомнили пароль?{" "}
      <span>
        <Link>Войти</Link>
      </span>
    </p>
  );

  return (
    <main>
      <Form
        title="Восстановление пароля"
        form={form}
        footer={footer}
        onSubmit={onSubmit}
        submitLabel="Восстановить"
      />
    </main>
  );
};
