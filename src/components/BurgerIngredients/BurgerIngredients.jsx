import PropTypes from "prop-types";
import { useState } from "react";
import { Tabs } from "./Tabs";
import { Ingredients } from "./Ingredients";
import { ingredientTypes } from "../../utils/types";
import { clsx } from "clsx";
import style from "./style.module.css";

export const BurgerIngredients = ({ data, height, className }) => {
    const tabs = [
        {
            text: 'Булки',
            value: 'bun'
        },
        {
            text: 'Соусы',
            value: 'sauce'
        },
        {
            text: 'Начинки',
            value: 'main'
        },
    ]
    const [activeTab, setActiveTab] = useState(tabs[0].value)
    const list = Object.entries(
        data.reduce((acc, value) => ({
            ...acc,
            [value.type]: Array.isArray(acc[value.type]) ? [].concat(acc[value.type], value) : [value]

        }), {})
    ).map(([key, value]) => ({
        type: tabs.find(el => el.value === key).text,
        data: value
    }))

    return (
        <div className={clsx(style.main_container, className)}>
            <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <Tabs value={activeTab} tabs={tabs} onClick={setActiveTab} />
            <Ingredients data={list} height={height} />
        </div>
    )
}

export const burgerIngredientsPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape(ingredientTypes)
    ).isRequired,
    height: PropTypes.number.isRequired
}

BurgerIngredients.propTypes = burgerIngredientsPropTypes
