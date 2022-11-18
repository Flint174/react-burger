import { forwardRef, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryPropType } from "../../utils/types";
import { IngredientDetails } from "../ingredient-details";
import { Modal } from "../modal";
import { Card } from "./card";
import { clearDetails, setDetails } from "../../services/slices/ingredient-details-slice";

export const Category = forwardRef(({ type }, ref) => {
    const { data } = useSelector(store => store.ingredientsReducer)
    const details = useSelector(store => store.ingredientDetailsReducer)

    const dispatch = useDispatch()

    const closeIngredientDetails = useCallback(() => {
        dispatch(clearDetails())
    }, [dispatch])

    const openIngredientDetails = useCallback((value) => {
        dispatch(setDetails(value))
    }, [dispatch])

    const cardsList = useMemo(() =>
        data
            .filter(el => el.type === type.value)
            .map(info => (
                <Card
                    extraClass="ml-4"
                    info={info}
                    key={info._id}
                    onClick={() => openIngredientDetails(info)}
                />
            ))
        , [data, type, openIngredientDetails])

    return (
        <section ref={ref}>
            <h2 className="text text_type_main-large mb-6">{type.text || type.value}</h2>
            <div className='flex wor wrap mb-10'>
                {cardsList}
            </div>

            {
                details &&
                <Modal
                    title='Детали ингредиента'
                    onClose={closeIngredientDetails}
                >
                    <IngredientDetails />
                </Modal>
            }
        </section>
    )
})

export const categoryPropTypes = {
    type: categoryPropType.isRequired
}

Category.propTypes = categoryPropTypes
