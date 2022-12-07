import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../../components/form/form";
import { useForm } from "../../hooks/use-form";
import { fetchUserPatch } from "../../services/actions/auth-actions";
import styles from "./styles.module.css";

export const ProfileForm = () => {
  const { user } = useSelector((store) => store.authReducer);
  const formInitValues = { ...user, password: "", isChanged: false };
  const dispatch = useDispatch();
  const {
    values: { name, email, password, isChanged },
    handleChange,
    setValues,
  } = useForm(formInitValues);

  const onSubmit = (event) => {
    event.preventDefault();
    const body = Object.assign({ name, email }, password ? { password } : {});
    dispatch(fetchUserPatch(body));
  };

  const onReset = (event) => {
    event.preventDefault();
    setValues(formInitValues);
  };

  const handleChangeValues = (e) => {
    handleChange(e);
    setValues((prev) => ({
      ...prev,
      isChanged: formInitValues[e.target.name] !== e.target.value,
    }));
  };

  useEffect(() => {
    setValues(formInitValues);
    // formInitValues зависит от user
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const form = (
    <>
      <Input
        value={name}
        placeholder="Имя"
        icon="EditIcon"
        name="name"
        onChange={handleChangeValues}
      />
      <EmailInput
        value={email}
        icon="EditIcon"
        name="email"
        onChange={handleChangeValues}
      />
      <PasswordInput
        value={password}
        icon="EditIcon"
        name="password"
        onChange={handleChangeValues}
      />
    </>
  );

  const actions = isChanged ? (
    <div className={(clsx(styles.form_actions), "align-self_end")}>
      <Button htmlType="reset" type="secondary">
        Отмена
      </Button>
      <Button htmlType="submit">Сохранить</Button>
    </div>
  ) : (
    <></>
  );

  return (
    <Form form={form} actions={actions} onSubmit={onSubmit} onReset={onReset} />
  );
};
