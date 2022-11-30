import PropTypes from "prop-types";

export const Form = ({
  title,
  form,
  actions,
  footer,

  onSubmit,
  onReset,
}) => {
  return (
    <div className="flex column align-items_center justify-items_start">
      {title && <h1 className="text text_type_main-medium mb-6">{title}</h1>}
      <form
        className="flex column align-items_center gap-6"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        {form}
        {actions}
      </form>
      <div className="flex column align-items_center gap-4 text text_type_main-default text_color_inactive mt-20">
        {footer}
      </div>
    </div>
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
