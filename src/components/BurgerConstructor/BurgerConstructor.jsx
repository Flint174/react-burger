import { listPropTypes, Composition } from "./Composition";
import {
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import { OrderDetail } from "../OrderDetails";
import { useState } from "react";

export const BurgerConstructor = ({ bun, ingredients, className }) => {
    const [isToggled, setIsToggled] = useState(false)
    const [orderNumber, setOrderNumber] = useState(0)

    const total = 200
    const height = 400

    function closeOrderDetails () {
        setIsToggled(false)
    }

    function getOrderDedails () {
        // fetch() ...
        // test data
        Promise.resolve(Math.floor(Math.random() * 1000000))
            .then(number => {
                setOrderNumber(number)
                setIsToggled(true)
            })
    }

    return (
        <div className={clsx('flex column', className)} style={{ width: 600 }}>
            <Composition bun={bun} ingredients={ingredients} height={height} />
            <div className="mt-10 flex row align_items-center" style={{ alignSelf: 'flex-end' }}>
                <p className="text text_type_digits-medium mr-2">{total}</p>
                <CurrencyIcon />
                <Button htmlType="button" extraClass="ml-10" onClick={getOrderDedails}>ОФОРМИТЬ ЗАКАЗ</Button>
            </div>
            <OrderDetail orderNumber={orderNumber} show={isToggled} onClose={closeOrderDetails} />
        </div>
    )
}

export const burgerConstructorPropTypes = listPropTypes

BurgerConstructor.propTypes = burgerConstructorPropTypes
