import { forwardRef, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryPropType } from "../../utils/types";
import { IngredientDetails } from "../ingredient-details";
import { Modal } from "../modal";
import { Card } from "./card";
import { setDetails } from "../../services/slices/ingredient-details-slice";

export const Category = forwardRef(({ type, onClick }, ref) => {
    const [show, setShow] = useState(false)
    const { data } = useSelector(store => store.ingredientsReducer)
    const { bun, ingredients } = useSelector(store => store.constructorReducer)

    const dispatch = useDispatch()

    const closeOrderDetails = useCallback(() => {
        setShow(false)
    }, [setShow])

    const openIngredientsDetails = useCallback((value) => {
        dispatch(setDetails(value))
        setShow(true)
    }, [setShow, dispatch])

    const cardsList = useMemo(() =>
        data
            .filter(el => el.type === type.value)
            .map(info => {
                const count = info.type === 'bun'
                    ? (bun || 0) && (bun._id === info._id) * 1
                    : ingredients.filter(el => el._id === info._id).length
                return (
                    <Card
                        extraClass="ml-4"
                        info={info}
                        key={info._id}
                        count={count}
                        onClick={() => openIngredientsDetails(info)}
                    />
                )
            })
        , [data, type, openIngredientsDetails, bun, ingredients])

    return (
        <section onClick={onClick} ref={ref}>
            <h2 className="text text_type_main-large mb-6">{type.text || type.value}</h2>
            <div className='flex wor wrap mb-10'>
                {cardsList}
            </div>

            <Modal
                title='Детали ингредиента'
                isOpen={show}
                onClose={closeOrderDetails}
            >
                <IngredientDetails />
            </Modal>
        </section>
    )
})

export const categoryPropTypes = {
    type: categoryPropType.isRequired,
}

Category.propTypes = categoryPropTypes
