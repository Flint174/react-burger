import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../components/form/form";
import { useAuth } from "../../hooks/auth-hook";
import { PASSWORD_RESET_URL } from "../../utils/constants";
import { handleError, request, requestHeaders } from "../../utils/request";

export const ForgotPassword = () => {
  const { email, handleChangeEmailEvent, loading, setLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    const body = { email };
    setLoading(true);
    request(PASSWORD_RESET_URL, {
      method: "POST",
      headers: requestHeaders.post,
      body: JSON.stringify(body),
    })
      .then((res) => {
        setLoading(false);
        if (res.success) {
          navigate("/reset-password");
        }
      })
      .catch((err) => {
        setLoading(false);
        handleError(err);
      });
  };

  const form = <EmailInput value={email} onChange={handleChangeEmailEvent} />;
  const footer = (
    <div>
      Вспомнили пароль?{" "}
      <span>
        <Link to="/login">Войти</Link>
      </span>
    </div>
  );

  return (
    <main>
      <Form
        title="Восстановление пароля"
        form={form}
        footer={footer}
        onSubmit={onSubmit}
        submitLabel="Восстановить"
        submitIsActive={!loading}
      />
    </main>
  );
};
