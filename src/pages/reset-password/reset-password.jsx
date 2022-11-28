import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../components/form/form";
import { useState } from "react";
import { useProfile } from "../../hooks/profile-hook";
import { handleError, request } from "../../utils/request";
import { PASSWORD_RESET_RESET_URL } from "../../utils/constants";

export const ResetPassword = () => {
  const [code, setCode] = useState("");
  const { password, handleChangePasswordEvent } = useProfile();
  const navigate = useNavigate();

  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const body = {
      password,
      token: code,
    };
    request(PASSWORD_RESET_RESET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.success) {
          navigate("/login");
        }
      })
      .catch(handleError);
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
          <Link to="/login">Войти</Link>
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
