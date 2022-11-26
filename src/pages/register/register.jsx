import { useState } from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { Form } from "../../components/form/form";

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

  const form = (
    <>
      <Input
        value={name}
        onChange={onChangeName}
        type="text"
        placeholder="Имя"
      />
      <EmailInput value={email} onChange={onChangeEmail} />
      <PasswordInput value={password} onChange={onChangePassword} />
    </>
  );

  const footer = (
    <>
      <p>
        Уже зарегистрированы?{" "}
        <span>
          {/* TODO: link to... */}
          <Link>Войти</Link>
        </span>
      </p>
    </>
  );

  return (
    <main>
      <Form
        title="Регистрация"
        form={form}
        footer={footer}
        onSubmit={onSubmit}
        submitLabel="Зарегистрироваться"
      />
    </main>
  );
};
