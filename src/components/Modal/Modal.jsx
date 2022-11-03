import style from "./style.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { modalTypes } from "../../utils/types";
import { ModalOverlay } from "../ModalOverlay";
import { createPortal } from "react-dom";
import { modalsElement } from "../../utils/constants";
import { useEffect } from "react";

export const Modal = ({ isOpen, title, onClose, children }) => {

    function stopPropagation (e) {
        e.stopPropagation()
    }

    useEffect(() => {

        if (!isOpen) return

        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }

    }, [isOpen, onClose])

    return createPortal((
        <>
            {
                isOpen &&

                (<ModalOverlay onClose={onClose}>
                    <div className={style.modal} onClick={stopPropagation}>
                        <div className={style.modal_card_close}>
                            <CloseIcon onClick={onClose} />
                        </div>
                        <div className="flex row align_items-center mt-10 ml-10 mr-10 " style={{ height: 64, width: 640 }}>
                            <p className="text text_type_main-large">
                                {title}
                            </p>
                        </div>
                        <div className="flex column align_items-center justify_content-center">
                            {children}
                        </div>
                    </div>
                </ModalOverlay>
                )
            }

        </>
    ), modalsElement)
}

export const modalPropTypes = modalTypes
