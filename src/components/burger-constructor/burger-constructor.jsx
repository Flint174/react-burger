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
import { ORDERS_URL } from "../../utils/constants";
import { request, handleError } from '../../utils/request'
import { useSelector } from "react-redux";

export const BurgerConstructor = () => {
    const [show, setShow] = useState(false)
    const [orderNumber, setOrderNumber] = useState({
        value: 0,
        loading: false,
    })

    const { bun, ingredients } = useSelector(store => store.constructorReducer)

    const [total, setTotal] = useState(0)

    useEffect(() => {
        const bunPrice = bun && bun.price ? bun.price * 2 : 0
        const ingredientsPrice = ingredients.reduce((acc, value) => acc + value.price, 0)
        setTotal(bunPrice + ingredientsPrice)
    }, [bun, ingredients])

    function closeOrderDetails () {
        setShow(false)
    }

    const getOrderDedails = useCallback(() => {

        setOrderNumber(prev => ({ ...prev, loading: true }))
        request(ORDERS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients: [bun._id, ...ingredients.map(el => el._id), bun._id] })
        })
            .then(json => {
                setOrderNumber({ value: json.order.number, loading: false })
                setShow(true)
            })
            .catch(handleError)
    }, [bun, ingredients])

    const disableButton = useMemo(() => !bun || !ingredients.length || show, [bun, ingredients, show])

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
                <OrderDetail orderNumber={orderNumber.value} />
            </Modal>
        </section >
    )
}
