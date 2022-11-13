import style from "./style.module.css";
import { modalTypes } from "../../utils/types";

export const ModalOverlay = ({ onClose, children }) => {

    return (
        <div className={style.overlay} onClick={onClose}>
            {children}
        </div>
    )
}

export const modalOverlayPropTypes = modalTypes

