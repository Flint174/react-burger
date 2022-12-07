import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "../../components/form/form";
import { FormContainer } from "../../components/form/form-container";
import { useForm } from "../../hooks/use-form";
import { fetchRegister } from "../../services/actions/auth-actions";
import styles from "./styles.module.css";

export const Register = () => {
  const {
    values: { name, email, password },
    handleChange,
  } = useForm({ name: "", email: "", password: "" });

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
        name="name"
        onChange={handleChange}
        type="text"
        placeholder="Имя"
      />
      <EmailInput value={email} name="email" onChange={handleChange} />
      <PasswordInput value={password} name="password" onChange={handleChange} />
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

  const actions = (
    <Button htmlType="submit" extraClass={styles.btn} disabled={loading}>
      Зарегистрироваться
    </Button>
  );

  return (
    <main>
      <FormContainer>
        <Form
          title="Регистрация"
          form={form}
          actions={actions}
          footer={footer}
          onSubmit={onSubmit}
        />
      </FormContainer>
    </main>
  );
};
