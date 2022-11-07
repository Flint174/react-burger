import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import { IngredientDetails } from "../IngredientDetails";
import { Modal } from "../Modal";
import { Card, cardPropTypes } from "./Card";

export const ListItem = forwardRef(({ type, data, onClick }, ref) => {
    const [show, setShow] = useState(false)
    const [info, setInfo] = useState()

    function closeOrderDetails () {
        setShow(false)
    }

    function openOrderDetails (value) {
        setInfo(value)
        setShow(true)
    }
    return (
        <section onClick={onClick} ref={ref}>
            <h2 className="text text_type_main-large mb-6">{type.text || type.value}</h2>
            <div className='flex wor wrap mb-10'>
                {data.map(el => (<Card extraClass="ml-4" {...el} key={el._id} onClick={() => openOrderDetails(el)} />))}
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

export const listItemPropTypes = {
    type: PropTypes.shape({
        text: PropTypes.string,
        value: PropTypes.string,
    }).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape(cardPropTypes)).isRequired
}

ListItem.propTypes = listItemPropTypes
