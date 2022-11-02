import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { modalsElement } from "../../utils/constants";
import { modalTypes } from "../../utils/types";
import { Modal } from "../Modal";
import { ModalOverlay } from "../ModalOverlay";
import style from "./style.module.css";
import doneSvg from "../../images/done.svg";
import { clsx } from "clsx";

export const OrderDetail = ({ orderNumber, show, onClose }) => {
    return createPortal((
        <>
            {
                show &&

                <ModalOverlay onClose={onClose}>
                    <Modal onClose={onClose}>
                        <p className="text text_type_digits-large">
                            {('0'.repeat(6) + orderNumber).slice(-6)}
                        </p>

                        <p className="text text_type_main-medium mt-8">
                            идентификатор заказа
                        </p>

                        <img className={clsx(style.icon, 'm-15')} src={doneSvg} alt="done" />

                        <p className="text text_type_main-default">
                            Ваш заказ начали готовить
                        </p>

                        <p className="text text_type_main-default text_color_inactive mt-2">
                            Дождитесь готовности на орбитальной станции
                        </p>
                    </Modal>
                </ModalOverlay>
            }
        </>
    ), modalsElement)
}

export const orderDetailPropTypes = {
    ...modalTypes,
    orderNumber: PropTypes.number,
    show: PropTypes.bool,
}
