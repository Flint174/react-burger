import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Form } from "../../components/form/form";
import { handleError, request, requestHeaders } from "../../utils/request";
import { PASSWORD_RESET_RESET_URL } from "../../utils/constants";
import styles from "./styles.module.css";
import { FormContainer } from "../../components/form/form-container";
import { useForm } from "../../hooks/use-form";

export const ResetPassword = () => {
  const {
    values: { password, loading, code },
    handleChange,
    setValues,
  } = useForm({ password: "", loading: false, code: "" });
  const navigate = useNavigate();
  const { state } = useLocation();

  const onSubmit = (event) => {
    event.preventDefault();
    const body = {
      password,
      token: code,
    };
    setValues((prev) => ({ ...prev, loading: true }));
    request(PASSWORD_RESET_RESET_URL, {
      method: "POST",
      headers: requestHeaders.post,
      body: JSON.stringify(body),
    })
      .then((res) => {
        setValues((prev) => ({ ...prev, loading: false }));
        if (res.success) {
          navigate("/login", { replace: true });
        }
      })
      .catch((err) => {
        setValues((prev) => ({ ...prev, loading: false }));
        handleError(err);
      });
  };

  const form = (
    <>
      <PasswordInput
        value={password}
        placeholder="Введите новый пароль"
        name="password"
        onChange={handleChange}
      />
      <Input
        value={code}
        placeholder="Введите код из письма"
        name="code"
        onChange={handleChange}
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

  const actions = (
    <Button htmlType="submit" extraClass={styles.btn} disabled={loading}>
      Сохранить
    </Button>
  );

  if (!state || state.from !== "/forgot-password") {
    return <Navigate to="/" replace />;
  }

  return (
    <main>
      <FormContainer>
        <Form
          title="Восстановление пароля"
          form={form}
          actions={actions}
          footer={footer}
          onSubmit={onSubmit}
        />
      </FormContainer>
    </main>
  );
};
