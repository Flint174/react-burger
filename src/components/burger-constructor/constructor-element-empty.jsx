import PropTypes from "prop-types";
import styles from "./style.module.css";
import { clsx } from "clsx";

export const ConstructorElementEmpty = ({ type = "default", extraClass }) => {
  const text = type === "default" ? "Выберите ингредиент" : "Выберите булку";

  return (
    <div
      className={clsx(
        { [styles.empty_element_top]: type === "top" },
        { [styles.empty_element_default]: type === "default" },
        { [styles.empty_element_bottom]: type === "bottom" },
        extraClass
      )}
    >
      <p className="text text_type_main-default text_color_inactive">{text}</p>
    </div>
  );
};

ConstructorElementEmpty.propTypes = {
  type: PropTypes.oneOf(["top", "default", "bottom"]),
  extraClass: PropTypes.string,
};
