import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { clsx } from "clsx";

export const Form = ({
  title,
  form,
  actions,
  footer,

  onSubmit,
  onReset,
}) => {
  return (
    <section
      className={clsx(
        styles.container,
        "flex column align-items_center justify-items_start"
      )}
    >
      {title && <h1 className="text text_type_main-medium">{title}</h1>}
      <form
        className="flex column align-items_center gap-6 mt-6 mb-20"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        {form}
        {actions}
      </form>
      <div className="flex column align-items_center gap-4 text text_type_main-default text_color_inactive">
        {footer}
      </div>
    </section>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  form: PropTypes.element.isRequired,
  actions: PropTypes.element.isRequired,
  footer: PropTypes.element,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};
