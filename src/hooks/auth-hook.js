import { useEffect, useState } from "react";

export const useAuth = (profile = {}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanded] = useState(false);

  const handleChangeNameEvent = (e) => {
    setName(e.target.value);
    setIsChanded(true);
  };

  const handleChangeEmailEvent = (e) => {
    setEmail(e.target.value);
    setIsChanded(true);
  };

  const handleChangePasswordEvent = (e) => {
    setPassword(e.target.value);
    setIsChanded(true);
  };

  const clearProfile = () => {
    setName(profile.name || "");
    setEmail(profile.email || "");
    setPassword(profile.password || "");
    setIsChanded(false);
  };

  useEffect(() => {
    setName((prev) =>
      typeof profile.name === "undefined" ? prev : profile.name
    );
    setEmail((prev) =>
      typeof profile.email === "undefined" ? prev : profile.email
    );
    setPassword((prev) =>
      typeof profile.password === "undefined" ? prev : profile.password
    );
    setIsChanded(false);
  }, [profile]);

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
    isChanged,
    setIsChanded,
  };
};
