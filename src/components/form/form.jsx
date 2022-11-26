import PropTypes from "prop-types";
import styles from "./styles.module.css";

export const Form = ({ title, form, footer, onSubmit }) => {
  return (
    <section className={styles.container}>
      {title && <h1 className="text text_type_main-medium">{title}</h1>}
      <form
        className="flex column align-items_center gap-6 mt-6 mb-20"
        onSubmit={onSubmit}
      >
        {form}
      </form>
      <div className="flex column align-items_center gap-4">{footer}</div>
    </section>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  form: PropTypes.element.isRequired,
  footer: PropTypes.element.isRequired,
};
