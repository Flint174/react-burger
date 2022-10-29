import PropTypes from "prop-types";
import style from "./style.module.css";
import {
    CurrencyIcon,
    Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientTypes } from "../../utils/types";
import { clsx } from "clsx";

const Card = ({ image, price, name, count, className }) => {
    return (
        <div className={clsx(style.card_container, 'flex column align_items-center', className)}>
            {!!count && <Counter count={count} />}
            <img
                className={clsx(style.card_img, "ml-4 mr-4")}
                src={image}
                alt="Oops"
            />
            <div className="flex row align_items-center mt-1 mb-1">
                <p className="text text_type_digits-default mr-1">{price}</p>
                <CurrencyIcon />
            </div>
            <p className={clsx(style.card_name, "text text_type_main-default")}>{name}</p>
        </div>
    )
}

export const cardPropTypes = {
    ...ingredientTypes,
    count: PropTypes.number
}

Card.propTypes = cardPropTypes

export default Card