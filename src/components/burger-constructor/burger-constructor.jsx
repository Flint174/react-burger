import { Composition } from "./composition";
import {
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import { OrderDetail } from "../order-details";
import { useCallback, useEffect, useMemo, useState } from "react";
import style from "./style.module.css";
import { Modal } from "../modal";
import { useSelector } from "react-redux";
import { fetchOrder } from "../../services/actions/order-actions";
import { clearOrder } from '../../services/slices/order-slice'
import { clearConstructor } from '../../services/slices/constructor-slice'
import { useDispatch } from "react-redux";

export const BurgerConstructor = () => {
    const { bun, ingredients } = useSelector(store => store.constructorReducer)

    const { orderNumber, loading } = useSelector(store => store.orderReducer)
    const dispatch = useDispatch()

    const total = useMemo(() => {
        const bunPrice = bun ? bun.price * 2 : 0
        const ingredientsPrice = ingredients.reduce((acc, value) => acc + value.price, 0)
        return bunPrice + ingredientsPrice
    }, [bun, ingredients])

    function closeOrderDetails () {
        dispatch(clearOrder())
        dispatch(clearConstructor())
    }

    const getOrderDedails = () => {
        const ingredientsIds = [bun._id, ...ingredients.map(el => el._id), bun._id];
        dispatch(fetchOrder({ ingredients: ingredientsIds }))
    }

    const disableButton = useMemo(() => !bun || !ingredients.length || orderNumber || loading, [bun, ingredients, orderNumber, loading])

    return (
        <section className={clsx('flex column', style.container)}>
            <Composition />
            <div className="mt-10 flex row align-items_center align-self_end">
                <p className="text text_type_digits-medium mr-2">{total}</p>
                <CurrencyIcon />
                <Button
                    disabled={disableButton}
                    htmlType="button"
                    extraClass="ml-10"
                    onClick={getOrderDedails}
                >
                    ОФОРМИТЬ ЗАКАЗ
                </Button>
            </div>
            {
                orderNumber &&
                <Modal
                    onClose={closeOrderDetails} >
                    <OrderDetail orderNumber={orderNumber} />
                </Modal>
            }
        </section >
    )
}
