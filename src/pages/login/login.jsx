import styles from "./styles.module.css";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword } from "../../services/slices/auth-slice";
import { Form } from "../../components/form/form";

export const Login = () => {
  const { email, password } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const onEmailChange = (event) => {
    dispatch(setEmail(event.target.value));
  };

  const onChangePassword = (event) => {
    dispatch(setPassword(event.target.value));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    /**
     * TODO: send form
     */
  };

  const form = (
    <>
      <EmailInput value={email} onChange={onEmailChange} />
      <PasswordInput value={password} onChange={onChangePassword} />
    </>
  );

  const footer = (
    <>
      <p className={styles.p}>
        Вы новый пользователь?{" "}
        <span>
          {/* TODO: link to... */}
          <Link>Зарегистрироваться</Link>
        </span>
      </p>
      <p className={styles.p}>
        Забыли пароль?{" "}
        <span>
          {/* TODO: link to... */}
          <Link>Восстановить пароль</Link>
        </span>
      </p>
    </>
  );

  return (
    <main>
      <Form
        title="Вход"
        form={form}
        footer={footer}
        onSubmit={onSubmit}
        submitLabel="Восстановить"
      />
    </main>
  );
};
