import PropTypes from "prop-types";
import { createRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { modalsElement } from "../../utils/constants";
import { modalTypes } from "../../utils/types";
import { Modal } from "../Modal";
import { ModalOverlay } from "../ModalOverlay";

export const OrderDetail = ({ show, onClose }) => {

    return createPortal((
        <>
            {
                show &&

                <ModalOverlay onClose={onClose}>
                    <Modal onClose={onClose}>
                        <p>hello</p>
                        <p>hello</p>
                        <p>hello</p>
                        <p>hello</p>
                        <p>hello</p>
                        <p>hello</p>
                    </Modal>
                </ModalOverlay>
            }
        </>
    ), modalsElement)
}

export const orderDetailPropTypes = {
    show: PropTypes.bool,
    ...modalTypes
}
