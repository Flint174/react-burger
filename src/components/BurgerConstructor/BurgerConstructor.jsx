import { listPropTypes, Composition } from "./Composition";
import {
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import { OrderDetail } from "../OrderDetails";
import { useState } from "react";
import style from "./style.module.css";
import { Modal } from "../Modal";

export const BurgerConstructor = ({ bun, ingredients, className }) => {
    const [show, setShow] = useState(false)
    const [orderNumber, setOrderNumber] = useState(0)

    const total = 200
    const height = 400

    function closeOrderDetails () {
        setShow(false)
    }

    function getOrderDedails () {
        // fetch() ...
        // test data
        Promise.resolve(Math.floor(Math.random() * 1000000))
            .then(number => {
                setOrderNumber(number)
                setShow(true)
            })
    }

    return (
        <div className={clsx('flex column', style.container, className)}>
            <Composition bun={bun} ingredients={ingredients} height={height} />
            <div className="mt-10 flex row align_items-center align_self-end">
                <p className="text text_type_digits-medium mr-2">{total}</p>
                <CurrencyIcon />
                <Button htmlType="button" extraClass="ml-10" onClick={getOrderDedails}>ОФОРМИТЬ ЗАКАЗ</Button>
            </div>

            <Modal
                isOpen={show}
                onClose={closeOrderDetails} >
                <OrderDetail orderNumber={orderNumber} />
            </Modal>
        </div>
    )
}

export const burgerConstructorPropTypes = listPropTypes

BurgerConstructor.propTypes = burgerConstructorPropTypes
