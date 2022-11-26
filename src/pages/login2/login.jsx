import styles from "./styles.module.css";
import { clsx } from "clsx";
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword } from "../../services/slices/auth-slice";

export const Login = () => {
  const { email, password } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const onEmailChange = (event) => {
    dispatch(setEmail(event.target.value));
  };

  const onPasswordChange = (event) => {
    dispatch(setPassword(event.target.value));
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
        <EmailInput value={email} onChange={onEmailChange} />
        <PasswordInput value={password} onChange={onPasswordChange} />
        <Button htmlType="submit" extraClass={styles.btn}>
          Войти
        </Button>
      </form>
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
    </main>
  );
};
