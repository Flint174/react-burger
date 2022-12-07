import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../components/form/form";
import { FormContainer } from "../../components/form/form-container";
import { useForm } from "../../hooks/use-form";
import { PASSWORD_RESET_URL } from "../../utils/constants";
import { handleError, request, requestHeaders } from "../../utils/request";
import styles from "./styles.module.css";

export const ForgotPassword = () => {
  const {
    values: { email, loading },
    handleChange,
    setValues,
  } = useForm({ email: "", loading: false });

  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    const body = { email };
    setValues((prev) => ({ ...prev, loading: true }));
    request(PASSWORD_RESET_URL, {
      method: "POST",
      headers: requestHeaders.post,
      body: JSON.stringify(body),
    })
      .then((res) => {
        setValues((prev) => ({ ...prev, loading: false }));
        if (res.success) {
          navigate("/reset-password", {
            state: { from: "/forgot-password" },
            replace: true,
          });
        }
      })
      .catch((err) => {
        setValues((prev) => ({ ...prev, loading: false }));
        handleError(err);
      });
  };

  const form = (
    <EmailInput value={email} name="email" onChange={handleChange} />
  );
  const footer = (
    <div>
      Вспомнили пароль?{" "}
      <span>
        <Link to="/login">Войти</Link>
      </span>
    </div>
  );
  const actions = (
    <Button htmlType="submit" extraClass={styles.btn} disabled={loading}>
      Восстановить
    </Button>
  );

  return (
    <main>
      <FormContainer>
        <Form
          title="Восстановление пароля"
          form={form}
          actions={actions}
          footer={footer}
          onSubmit={onSubmit}
        />
      </FormContainer>
    </main>
  );
};
