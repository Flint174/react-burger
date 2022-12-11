import { FC, ReactElement } from "react";
import styles from "./styles.module.css";

interface FormContainerProps {
  children?: ReactElement;
}
export const FormContainer: FC<FormContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
