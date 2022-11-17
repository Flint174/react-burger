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
import { fetchOrder } from "../../services/slices/order-slice";
import { useDispatch } from "react-redux";

export const BurgerConstructor = () => {
    const [show, setShow] = useState(false)

    const { bun, ingredients } = useSelector(store => store.constructorReducer)

    const [total, setTotal] = useState(0)

    const { orderNumber, loading } = useSelector(store => store.orderReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        const bunPrice = bun && bun.price ? bun.price * 2 : 0
        const ingredientsPrice = ingredients.reduce((acc, value) => acc + value.price, 0)
        setTotal(bunPrice + ingredientsPrice)
    }, [bun, ingredients])

    useEffect(() => {
        orderNumber && setShow(true)
    }, [orderNumber])

    function closeOrderDetails () {
        setShow(false)
    }

    const getOrderDedails = useCallback(() => {
        dispatch(fetchOrder(JSON.stringify({ ingredients: [bun._id, ...ingredients.map(el => el._id), bun._id] })))
    }, [dispatch, bun, ingredients])

    const disableButton = useMemo(() => !bun || !ingredients.length || show || loading, [bun, ingredients, show, loading])

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
            <Modal
                isOpen={show}
                onClose={closeOrderDetails} >
                <OrderDetail orderNumber={orderNumber} />
            </Modal>
        </section >
    )
}
