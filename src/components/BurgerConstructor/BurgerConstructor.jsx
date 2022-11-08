import { Composition } from "./Composition";
import {
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import { OrderDetail } from "../OrderDetails";
import { useCallback, useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import { Modal } from "../Modal";
import { AppDataContext } from "../../context/appContext";
import { ORDERS_URL } from "../../utils/constants";
import { request, handleError } from '../../utils/request'

export const BurgerConstructor = () => {
    const [show, setShow] = useState(false)
    const [orderNumber, setOrderNumber] = useState(0)
    const { data } = useContext(AppDataContext)

    const getBun = (value) => value.find(el => el.type === 'bun')
    const [bun, setBun] = useState(getBun(data))

    const getIngredients = (value) => value.filter(el => el.type !== 'bun')
    const [ingredients, setIngredients] = useState(getIngredients(data))

    const [total, setTotal] = useState(0)

    useEffect(() => {
        const newBun = getBun(data)
        const newIngredients = getIngredients(data)
        const bunPrice = newBun && newBun.price
            ? newBun.price * 2
            : 0
        const ingredientsPrice = Array.isArray(newIngredients)
            ? newIngredients.reduce((acc, value) => acc + value.price, 0)
            : 0
        setBun(newBun)
        setIngredients(newIngredients)
        setTotal(bunPrice + ingredientsPrice)
    }, [data])

    const height = 400

    function closeOrderDetails () {
        setShow(false)
    }

    const getOrderDedails = useCallback(() => {

        request(ORDERS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients: [bun._id, ...ingredients.map(el => el._id), bun._id] })
        })
            .then(json => {
                setOrderNumber(json.order.number)
                setShow(true)
            })
            .catch(handleError)
    }, [bun, ingredients])

    return (
        <section className={clsx('flex column', style.container)}>
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
        </section>
    )
}
