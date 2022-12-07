import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { clsx } from "clsx";
import { NavLink } from "react-router-dom";

export const HeaderLink = ({ text, icon, href }) => {
  return (
    <NavLink className={clsx(styles.link, "m-5 flex row")} to={href}>
      {({ isActive }) => (
        <>
          {icon({ type: isActive ? "primary" : "secondary" })}
          <p
            className={clsx(
              "text text_type_main-default ml-2",
              {
                text_color_inactive: !isActive,
              },
              styles.p
            )}
          >
            {text}
          </p>
        </>
      )}
    </NavLink>
  );
};

HeaderLink.propTypes = {
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
