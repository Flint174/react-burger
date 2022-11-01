import style from "./style.module.css";
import { modalTypes } from "../../utils/types";
import { useEffect } from "react";

export const ModalOverlay = ({ onClose, children }) => {

    useEffect(() => {

        const onKeyDown = (e) => {
            // console.log(e.key)
            if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }

    }, [onClose])

    return (
        <div className={style.overlay} onClick={onClose}>
            {children}
        </div>
    )
}

export const modalOverlayPropTypes = modalTypes

