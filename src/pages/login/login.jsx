import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "../../components/form/form";
import { useAuth } from "../../hooks/auth-hook";
import { fetchLogin } from "../../services/actions/auth-actions";

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

  return (
    <main>
      <Form
        title="Вход"
        form={form}
        footer={footer}
        onSubmit={onSubmit}
        submitLabel="Войти"
        submitIsActive={!loading}
      />
    </main>
  );
};
