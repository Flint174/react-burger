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

  const onChangeEmail = (event) => {
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
      <EmailInput value={email} onChange={onChangeEmail} />
      <PasswordInput value={password} onChange={onChangePassword} />
    </>
  );

  const footer = (
    <>
      <div>
        Вы новый пользователь?{" "}
        <span>
          {/* TODO: link to... */}
          <Link>Зарегистрироваться</Link>
        </span>
      </div>
      <div>
        Забыли пароль?{" "}
        <span>
          {/* TODO: link to... */}
          <Link>Восстановить пароль</Link>
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
        submitLabel="Восстановить"
      />
    </main>
  );
};
