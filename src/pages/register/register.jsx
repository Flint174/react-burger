import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "../../components/form/form";
import { useAuth } from "../../hooks/auth-hook";
import { fetchRegister } from "../../services/actions/auth-actions";

export const Register = () => {
  const {
    name,
    email,
    password,
    handleChangeNameEvent,
    handleChangeEmailEvent,
    handleChangePasswordEvent,
  } = useAuth();

  const { loading } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchRegister({ name, email, password }));
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
          <Link to="/login">Войти</Link>
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
        submitIsActive={!loading}
      />
    </main>
  );
};
