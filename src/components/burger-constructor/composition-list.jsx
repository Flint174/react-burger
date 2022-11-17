import { clsx } from "clsx";
import style from "./style.module.css";
import { CompositionListItem } from "./composition-list-item";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElementEmpty } from "./constructor-element-empty";
import { useDispatch, useSelector } from "react-redux";
import { removeIngredient } from "../../services/slices/constructor-slice";
import { useMemo } from "react";

export const CompositionList = () => {
    const ingredients = useSelector(store => store.constructorReducer.ingredients)
    const dispatch = useDispatch()

    const compositionList = useMemo(() =>
        Array.isArray(ingredients) && ingredients.length
            ? ingredients.map(el => (
                <CompositionListItem key={el.uuid}>
                    <ConstructorElement
                        text={el.name}
                        thumbnail={el.image}
                        price={el.price}
                        handleClose={() => dispatch(removeIngredient(el.uuid))}
                    />

                </CompositionListItem>
            )) : (
                <CompositionListItem isLocked={true}>
                    <ConstructorElementEmpty
                        text={'Выберите ингредиент'}
                    />
                </CompositionListItem>
            )
        , [ingredients])


    return (
        <div className={clsx(style.ingredients_scroll, "flex column gap-4")} >
            {compositionList}
        </div>
    )
}
