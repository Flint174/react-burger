import PropTypes from "prop-types";

export const InfoField = ({ name, value }) => {
    return (
        <div className="flex column align_items-center" style={{ minWidth: 112 }}>
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