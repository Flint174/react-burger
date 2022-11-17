import PropTypes from "prop-types";
import style from "./style.module.css";
import {
    CurrencyIcon,
    Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/types";
import { dragTypes } from "../../utils/constants";
import { clsx } from "clsx";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { addIngredient, setBun } from "../../services/slices/constructor-slice";
import { v4 as uuidv4 } from 'uuid';

export const Card = ({ info, count, onClick, extraClass }) => {
    const dispatch = useDispatch()
    const { image, price, name } = info
    const [{ isDragging }, drag] = useDrag(() => ({
        type: dragTypes.INGREDIENT,
        item: info,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                const newItem = { ...info, uuid: uuidv4() }
                if (item.type === 'bun') {
                    dispatch(setBun(newItem))
                } else {
                    dispatch(addIngredient(newItem))
                }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    const dragStyle = isDragging ? { opacity: 0.2 } : {}

    return (
        <div
            ref={drag}
            className={clsx(style.card_container, 'flex column align-items_center', extraClass)}
            style={dragStyle}
            onClick={onClick}
        >
            {!!count && <Counter count={count} />}
            <img
                className={clsx(style.card_img, "ml-4 mr-4")}
                src={image}
                alt="Oops"
            />
            <div className="flex row align-items_center mt-1 mb-1">
                <p className="text text_type_digits-default mr-1">{price}</p>
                <CurrencyIcon />
            </div>
            <p className={clsx(style.card_name, "text text_type_main-default")}>{name}</p>
        </div>
    )
}

export const cardPropTypes = {
    info: ingredientPropType.isRequired,
    count: PropTypes.number,
    onClick: PropTypes.func,
    extraClass: PropTypes.string
}

Card.propTypes = cardPropTypes
