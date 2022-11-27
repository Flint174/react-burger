import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { Form } from "../../components/form/form";
import { useProfile } from "../../hooks/profile-hook";

export const ForgotPassword = () => {
  const { email, handleChangeEmailEvent } = useProfile();

  const onSubmit = (event) => {
    event.preventDefault();
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
