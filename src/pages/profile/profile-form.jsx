import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../../components/form/form";
import { useAuth } from "../../hooks/auth-hook";
import { fetchUserPatch } from "../../services/actions/auth-actions";
import styles from "./styles.module.css";

export const ProfileForm = () => {
  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const {
    name,
    email,
    password,
    handleChangeNameEvent,
    handleChangeEmailEvent,
    handleChangePasswordEvent,
    clearProfile,
  } = useAuth(user);

  const onSubmit = (event) => {
    event.preventDefault();
    const body = Object.assign({ name, email }, password ? { password } : {});
    dispatch(fetchUserPatch(body));
  };

  const onReset = (event) => {
    event.preventDefault();
    clearProfile();
  };

  const form = (
    <>
      <Input
        value={name}
        placeholder="Имя"
        icon="EditIcon"
        onChange={handleChangeNameEvent}
      />
      <EmailInput
        value={email}
        icon="EditIcon"
        onChange={handleChangeEmailEvent}
      />
      <PasswordInput
        value={password}
        icon="EditIcon"
        onChange={handleChangePasswordEvent}
      />
    </>
  );

  const actions = (
    <div className={(clsx(styles.form_actions), "align-self_end")}>
      <Button htmlType="reset" type="secondary">
        Отмена
      </Button>
      <Button htmlType="submit">Сохранить</Button>
    </div>
  );

  return (
    <Form form={form} actions={actions} onSubmit={onSubmit} onReset={onReset} />
  );
};
