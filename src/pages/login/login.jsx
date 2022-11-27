import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { Form } from "../../components/form/form";
import { useProfile } from "../../hooks/profile-hook";

export const Login = () => {
  const { email, password, handleChangeEmailEvent, handleChangePasswordEvent } =
    useProfile();
  const onSubmit = (event) => {
    event.preventDefault();
    /**
     * TODO: send form
     */
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
