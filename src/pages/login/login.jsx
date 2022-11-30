import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "../../components/form/form";
import { useAuth } from "../../hooks/auth-hook";
import { fetchLogin } from "../../services/actions/auth-actions";
import styles from "./styles.module.css";

export const Login = () => {
  const { email, password, handleChangeEmailEvent, handleChangePasswordEvent } =
    useAuth();
  const { loading } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchLogin({ email, password }));
  };

  const form = (
    <>
      <EmailInput value={email} onChange={handleChangeEmailEvent} />
      <PasswordInput value={password} onChange={handleChangePasswordEvent} />
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
      <Form
        title="Вход"
        form={form}
        actions={actions}
        footer={footer}
        onSubmit={onSubmit}
      />
    </main>
  );
};
