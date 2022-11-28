import { useState } from "react";

export const useAuth = (profile = {}) => {
  const [name, setName] = useState(profile.name || "");
  const [email, setEmail] = useState(profile.email || "");
  const [password, setPassword] = useState(profile.password || "");
  const [loading, setLoading] = useState(false);

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
    loading,
    setLoading,
  };
};
