import { useDrop } from 'react-dnd'
import { dragTypes } from "../../utils/constants";
import style from "./style.module.css";
import { clsx } from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElementEmpty } from "./constructor-element-empty";
import { CompositionListItem } from "./composition-list-item";
import { CompositionDragItem } from "./composition-drag-item";
import { removeIngredient } from "../../services/slices/constructor-slice";

export const Composition = () => {
    const bun = useSelector(store => store.constructorReducer.bun)
    const ingredients = useSelector(store => store.constructorReducer.ingredients)
    const dispatch = useDispatch()
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: dragTypes.INGREDIENT,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const className = clsx(
        style.composition_container,
        canDrop && (isOver ? style.composition_container_isover : style.composition_container_candrop),
        "flex column gap-4 mt-25"
    )

    return (
        <div ref={drop} className={className} >
            <CompositionListItem isLocked={true}>
                {
                    bun ? (
                        <ConstructorElement
                            text={bun.name + ' (верх)'}
                            thumbnail={bun.image}
                            price={bun.price}
                            isLocked={true}
                            type="top"
                        />
                    ) : (<ConstructorElementEmpty type={'top'} />)

                }
            </CompositionListItem>

            <div className={clsx(style.ingredients_scroll, "flex column gap-4")} >
                {
                    Array.isArray(ingredients) && ingredients.length
                        ? ingredients.map((el, index) => (
                            <CompositionDragItem
                                id={el.uuid}
                                index={index}
                                key={el.uuid}
                            >
                                <CompositionListItem>
                                    <ConstructorElement
                                        text={el.name}
                                        thumbnail={el.image}
                                        price={el.price}
                                        handleClose={() => dispatch(removeIngredient(el.uuid))}
                                    />

                                </CompositionListItem>
                            </CompositionDragItem>
                        )) : (
                            <CompositionListItem isLocked={true}>
                                <ConstructorElementEmpty />
                            </CompositionListItem>
                        )
                }
            </div>

            <CompositionListItem isLocked={true}>
                {
                    bun ? (
                        <ConstructorElement
                            text={bun.name + ' (низ)'}
                            thumbnail={bun.image}
                            price={bun.price}
                            isLocked={true}
                            type="bottom"
                        />
                    ) : (<ConstructorElementEmpty type={'bottom'} />)

                }
            </CompositionListItem>
        </div>
    )
}
