import { Composition } from "./composition";
import {
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import { OrderDetail } from "../order-details";
import { useCallback, useEffect, useState } from "react";
import style from "./style.module.css";
import { Modal } from "../modal";
import { ORDERS_URL } from "../../utils/constants";
import { request, handleError } from '../../utils/request'
import {
    useSelector,
    useDispatch
} from "react-redux";
import {
    setBun,
    addIngredient,
} from "../../services/slices/constructor-slice";
import { v4 as uuidv4 } from 'uuid';

export const BurgerConstructor = () => {
    const [show, setShow] = useState(false)
    const [orderNumber, setOrderNumber] = useState(0)
    const dispatch = useDispatch()
    const { data } = useSelector(store => store.ingredientsReducer)

    const getBun = (value) => value.find(el => el.type === 'bun')
    const { bun, ingredients } = useSelector(store => store.constructorReducer)

    const getIngredients = (value) =>
        value
            .filter(el => el.type !== 'bun')
            .map(el => ({ ...el, uuid: uuidv4() }))

    const [total, setTotal] = useState(0)

    // useEffect(() => {
    //     const newBun = getBun(data)
    //     const newIngredients = getIngredients(data)
    //     const bunPrice = newBun && newBun.price
    //         ? newBun.price * 2
    //         : 0
    //     const ingredientsPrice = Array.isArray(newIngredients)
    //         ? newIngredients.reduce((acc, value) => acc + value.price, 0)
    //         : 0
    //     dispatch(setBun(newBun))
    //     newIngredients.forEach(el => dispatch(addIngredient(el)))
    //     setTotal(bunPrice + ingredientsPrice)
    // }, [data])

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
            <Composition />
            <div className="mt-10 flex row align-items_center align-self_end">
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
