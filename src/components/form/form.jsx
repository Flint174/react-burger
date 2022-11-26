import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { clsx } from "clsx";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const Form = ({ title, form, footer, onSubmit, submitLabel }) => {
  return (
    <section
      className={clsx(
        styles.container,
        "flex column align-items_center justify-items_start"
      )}
    >
      <h1 className="text text_type_main-medium">{title}</h1>
      <form
        className="flex column align-items_center gap-6 mt-6 mb-20"
        onSubmit={onSubmit}
      >
        {form}
        <Button htmlType="submit" extraClass={styles.btn}>
          {submitLabel}
        </Button>
      </form>
      <div
        className="flex column align-items_center gap-4 text text_type_main-default text_color_inactive"
        style={{ margin: 0 }}
      >
        {footer}
      </div>
    </section>
  );
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  form: PropTypes.element.isRequired,
  footer: PropTypes.element.isRequired,
  submitLabel: PropTypes.string.isRequired,
};
