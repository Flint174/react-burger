import PropTypes from "prop-types";
import style from "./style.module.css";
import { clsx } from "clsx";

export const InfoField = ({ name, value }) => {
    return (
        <div className={clsx(style.container, "flex column align_items-center")}>
            <p className="text text_type_main-default text_color_inactive">
                {name}
            </p>

            <p className="text text_type_digits-default text_color_inactive">
                {value}
            </p>
        </div>
    )
}

export const InfoFieldPropTypes = {
    name: PropTypes.string,
    value: PropTypes.number
}