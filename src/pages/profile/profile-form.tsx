import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { ChangeEvent, FormEvent, useEffect } from "react";
import { Form } from "../../components/form";
import { useForm } from "../../hooks/use-form";
import { useAppDispatch, useAppSelector } from "../../hooks/use-store";
import { fetchUserPatch } from "../../services/actions/auth-actions";
import styles from "./styles.module.css";

export const ProfileForm = () => {
  const { user } = useAppSelector((store) => store.authReducer);
  const formInitValues = {
    ...(user ? user : { name: "", email: "" }),
    password: "",
    isChanged: false,
  };
  const dispatch = useAppDispatch();
  const {
    values: { name, email, password, isChanged },
    handleChange,
    setValues,
  } = useForm(formInitValues);

  const onSubmit = (event: FormEvent<Element>) => {
    event.preventDefault();
    const body = {
      ...(name ? { name } : {}),
      ...(email ? { email } : {}),
      ...(password ? { password } : {}),
    };
    dispatch(fetchUserPatch(body));
  };

  const onReset = (event: FormEvent<Element>) => {
    event.preventDefault();
    setValues(formInitValues);
  };

  const handleChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setValues((prev) => ({
      ...prev,
      isChanged: true,
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
        isIcon={true}
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
    <main className={clsx(styles.profile_form, "pt-20 pl-15")}>
      <Form
        form={form}
        actions={actions}
        onSubmit={onSubmit}
        onReset={onReset}
      />
    </main>
  );
};
