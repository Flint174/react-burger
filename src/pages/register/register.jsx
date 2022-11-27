import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { Form } from "../../components/form/form";
import { useProfile } from "../../hooks/profile-hook";

export const Register = () => {
  const {
    name,
    email,
    password,
    handleChangeNameEvent,
    handleChangeEmailEvent,
    handleChangePasswordEvent,
  } = useProfile();

  const onSubmit = (event) => {
    event.preventDefault();
    /**
     * TODO: send form
     */
  };

  const form = (
    <>
      <Input
        value={name}
        onChange={handleChangeNameEvent}
        type="text"
        placeholder="Имя"
      />
      <EmailInput value={email} onChange={handleChangeEmailEvent} />
      <PasswordInput value={password} onChange={handleChangePasswordEvent} />
    </>
  );

  const footer = (
    <>
      <div>
        Уже зарегистрированы?{" "}
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
        title="Регистрация"
        form={form}
        footer={footer}
        onSubmit={onSubmit}
        submitLabel="Зарегистрироваться"
      />
    </main>
  );
};
