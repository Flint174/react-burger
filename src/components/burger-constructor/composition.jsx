import PropTypes from "prop-types";
import {
    ConstructorElement,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientTypes } from "../../utils/types";
import style from "./style.module.css";
import { clsx } from "clsx";
import { ConstructorElementEmpty } from "./constructor-element-empty";
import { Bun } from "./bun";
import { useMemo } from "react";


export const Composition = ({ ingredients, bun, height }) => {
    // export const Composition = ({ ingredients, height }) => {
    // Fake data
    // const bun = undefined

    const ingredientsList = useMemo(() => {
        return (
            <div
                className={clsx(style.ingredients_scroll, "flex column gap-4")}
                style={{ maxHeight: height }}
            >
                {
                    ingredients
                        ? ingredients.map(el => (
                            <div className="flex row align-items_center" key={el.uuid}>
                                <DragIcon />
                                <ConstructorElement
                                    text={el.name}
                                    thumbnail={el.image}
                                    price={el.price}
                                    extraClass="ml-2"
                                />
                            </div>
                        )) : (
                            <div className="flex row align-items_center">
                                <DragIcon />
                                <ConstructorElementEmpty
                                    text={'Выберите ингредиенты'}
                                    extraClass="ml-2"
                                />
                            </div>
                        )
                }
            </div>
        )
    }, [ingredients, height])

    return (
        <div className="flex column gap-4">
            <Bun bun={bun} type={'top'} extraClass="mt-25 ml-8" />
            {ingredientsList}
            <Bun bun={bun} type={'bottom'} extraClass="ml-8" />
        </div>
    )
}

export const listPropTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            ...ingredientTypes,
            uuid: PropTypes.string.isRequired
        })
    ).isRequired,
    bun: PropTypes.shape(ingredientTypes),
    height: PropTypes.number.isRequired
}

Composition.propTypes = listPropTypes
