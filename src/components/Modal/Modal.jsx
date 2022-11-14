import style from "./style.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { modalTypes } from "../../utils/types";
import { ModalOverlay } from "../modal-overlay";
import { createPortal } from "react-dom";
import { MODALS_ELEMENT } from "../../utils/constants";
import { useEffect } from "react";
import { clsx } from "clsx";

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
                    <section className={style.modal} onClick={stopPropagation}>
                        <div className={style.modal_card_close}>
                            <CloseIcon onClick={onClose} />
                        </div>
                        <div className={clsx(style.title_container, "flex row align-items_center mt-10 ml-10 mr-10")}>
                            <h3 className="text text_type_main-large">
                                {title}
                            </h3>
                        </div>
                        <div className="flex column align-items_center justify-content_center">
                            {children}
                        </div>
                    </section>
                </ModalOverlay>
                )
            }

        </>
    ), MODALS_ELEMENT)
}

export const modalPropTypes = modalTypes
