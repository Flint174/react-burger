import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Form, FormContainer } from "../../components/form";
import { useForm } from "../../hooks/use-form";
import { useAppDispatch, useAppSelector } from "../../hooks/use-store";
import { fetchLogin } from "../../services/actions/auth-actions";
import styles from "./styles.module.css";

export const Login = () => {
  const {
    values: { email, password },
    handleChange,
  } = useForm({ email: "", password: "" });
  const { loading } = useAppSelector((store) => store.authReducer);
  const dispatch = useAppDispatch();

  const onSubmit = (event: FormEvent<Element>) => {
    event.preventDefault();
    dispatch(fetchLogin({ email, password }));
  };

  const form = (
    <>
      <EmailInput value={email} name="email" onChange={handleChange} />
      <PasswordInput value={password} name="password" onChange={handleChange} />
    </>
  );

  const footer = (
    <>
      <div>
        Вы новый пользователь?{" "}
        <span>
          <Link to="/register">Зарегистрироваться</Link>
        </span>
      </div>
      <div>
        Забыли пароль?{" "}
        <span>
          <Link to="/forgot-password">Восстановить пароль</Link>
        </span>
      </div>
    </>
  );

  const actions = (
    <Button htmlType="submit" extraClass={styles.btn} disabled={loading}>
      Войти
    </Button>
  );

  return (
    <main>
      <FormContainer>
        <Form
          title="Вход"
          form={form}
          actions={actions}
          footer={footer}
          onSubmit={onSubmit}
        />
      </FormContainer>
    </main>
  );
};
