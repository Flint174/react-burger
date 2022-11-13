import PropTypes from "prop-types";
import { useState, useContext, useMemo } from "react";
import { Tabs } from "./tabs";
import { Ingredients } from "./ingredients";
import { clsx } from "clsx";
import style from "./style.module.css";
import { AppDataContext } from "../../context/appContext";

export const BurgerIngredients = ({ height }) => {
    const tabs = useMemo(() => [
        {
            text: 'Булки',
            value: 'bun',
        },
        {
            text: 'Соусы',
            value: 'sauce',
        },
        {
            text: 'Начинки',
            value: 'main',
        },
    ], [])
    const { data } = useContext(AppDataContext)
    const [activeTab, setActiveTab] = useState(tabs[0].value)
    const list = useMemo(() => Object.entries(
        data.reduce((acc, value) => ({
            ...acc,
            [value.type]: Array.isArray(acc[value.type]) ? [].concat(acc[value.type], value) : [value]

        }), {})

    ).map(([key, value]) => ({
        type: tabs.find(el => el.value === key) || { value: key },
        data: value
    })), [data, tabs])

    return (
        <section className={clsx(style.main_container)}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <Tabs value={activeTab} tabs={tabs} onClick={setActiveTab} />
            <Ingredients data={list} height={height} currentSection={activeTab} />
        </section>
    )
}

export const burgerIngredientsPropTypes = {
    height: PropTypes.number.isRequired
}

BurgerIngredients.propTypes = burgerIngredientsPropTypes
