import { forwardRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { categoryPropType } from "../../utils/types";
import { IngredientDetails } from "../ingredient-details";
import { Modal } from "../modal2";
import { Card } from "./card";

export const Category = forwardRef(({ type, onClick }, ref) => {
    const [show, setShow] = useState(false)
    const [info, setInfo] = useState()
    const { data } = useSelector(store => store.ingredientsReducer)

    function closeOrderDetails () {
        setShow(false)
    }

    function openOrderDetails (value) {
        setInfo(value)
        setShow(true)
    }

    const cardsList = useMemo(() =>
        data
            .filter(el => el.type === type.value)
            .map(info => info &&
                (<Card extraClass="ml-4" info={info} key={info._id} onClick={() => openOrderDetails(info)} />)
            )
        , [data, type])

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
                <IngredientDetails data={info} />
            </Modal>
        </section>
    )
})

export const categoryPropTypes = {
    type: categoryPropType.isRequired,
}

Category.propTypes = categoryPropTypes
