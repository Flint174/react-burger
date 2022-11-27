import { useState } from "react";

export const useProfile = ({
  name: initName = "",
  email: initEmail = "",
  password: initPassword = "",
}) => {
  const [name, setName] = useState(initName);
  const [email, setEmail] = useState(initEmail);
  const [password, setPassword] = useState(initPassword);

  const handleChangeNameEvent = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmailEvent = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePasswordEvent = (e) => {
    setPassword(e.target.value);
  };

  const clearProfile = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return {
    name,
    setName,
    handleChangeNameEvent,
    email,
    setEmail,
    handleChangeEmailEvent,
    password,
    setPassword,
    handleChangePasswordEvent,
    clearProfile,
  };
};
