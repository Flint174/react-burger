import PropTypes from "prop-types";
import style from "./style.module.css";
import { clsx } from "clsx";

export const InfoField = ({ name, value }) => {
    return (
        <div className={clsx(style.container, "flex column align-items_center")}>
            <p className="text text_type_main-default text_color_inactive">
                {name}
            </p>

            <p className="text text_type_digits-default text_color_inactive">
                {value}
            </p>
        </div>
    )
}

InfoField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
}
