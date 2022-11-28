import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../components/form/form";
import { useProfile } from "../../hooks/profile-hook";
import { PASSWORD_RESET_URL } from "../../utils/constants";
import { handleError, request } from "../../utils/request";

export const ForgotPassword = () => {
  const { email, handleChangeEmailEvent } = useProfile();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    const body = { email };
    request(PASSWORD_RESET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.success) {
          navigate("/reset-password");
        }
      })
      .catch(handleError);
  };

  const form = <EmailInput value={email} onChange={handleChangeEmailEvent} />;
  const footer = (
    <div>
      Вспомнили пароль?{" "}
      <span>
        <Link>Войти</Link>
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
      />
    </main>
  );
};
