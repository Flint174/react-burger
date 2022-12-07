import styles from "./styles.module.css";

export const FormContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
