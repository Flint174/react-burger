import { SyntheticEvent, useState } from "react";

export const useForm = <T extends Record<string, unknown>>(inputValues: T) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (
    event: SyntheticEvent & {
      target: { value: T; name: string };
    }
  ) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
};
