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
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, setBun } from "../../services/slices/constructor-slice";
import { v4 as uuidv4 } from 'uuid';

export const Card = ({ info, onClick, extraClass }) => {
    const dispatch = useDispatch()
    const { bun, ingredients } = useSelector(store => store.constructorReducer)
    const { image, price, name } = info
    const [{ isDragging }, drag] = useDrag(() => ({
        type: dragTypes.INGREDIENT,
        item: info,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                if (item.type === 'bun') {
                    dispatch(setBun(info))
                } else {
                    dispatch(addIngredient(info))
                }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    const dragStyle = isDragging ? { opacity: 0.2 } : {}

    // const calcCount = count * (info.type === 'bun' ? 2 : 1)
    const count = info.type === 'bun'
        ? (bun || 0) && (bun._id === info._id) * 2
        : ingredients.filter(el => el._id === info._id).length

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
    onClick: PropTypes.func.isRequired,
    extraClass: PropTypes.string
}

Card.propTypes = cardPropTypes
