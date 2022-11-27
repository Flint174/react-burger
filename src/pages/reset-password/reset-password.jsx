import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { Form } from "../../components/form/form";
import { useState } from "react";
import { useProfile } from "../../hooks/profile-hook";

export const ResetPassword = () => {
  const [code, setCode] = useState("");
  const { password, handleChangePasswordEvent } = useProfile();

  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    /**
     * TODO: send form
     */
  };

  const form = (
    <>
      <PasswordInput
        value={password}
        placeholder="Введите новый пароль"
        onChange={handleChangePasswordEvent}
      />
      <Input
        value={code}
        placeholder="Введите код из письма"
        onChange={handleChangeCode}
      />
    </>
  );

  const footer = (
    <>
      <div>
        Вспомнили пароль?{" "}
        <span>
          {/* TODO: link to... */}
          <Link>Войти</Link>
        </span>
      </div>
    </>
  );

  return (
    <main>
      <Form
        title="Восстановление пароля"
        form={form}
        footer={footer}
        onSubmit={onSubmit}
        submitLabel="Сохранить"
      />
    </main>
  );
};
