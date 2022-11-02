import style from "./style.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { modalTypes } from "../../utils/types";

export const Modal = ({ onClose, children }) => {

    function stopPropagation (e) {
        e.stopPropagation()
    }

    return (
        <div className={style.modal} onClick={stopPropagation}>
            <div className={style.modal_card_close}>
                <CloseIcon onClick={onClose} />
            </div>
            <div className="flex column align_items-center justify_content-center">
                {children}
            </div>
        </div>
    )
}

export const modalPropTypes = modalTypes
