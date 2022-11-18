import PropTypes from "prop-types";
import style from "./style.module.css";

export const ModalOverlay = ({ onClose, children }) => {

    return (
        <div className={style.overlay} onClick={onClose}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}
