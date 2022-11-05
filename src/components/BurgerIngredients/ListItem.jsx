import PropTypes from "prop-types";
import { useState } from "react";
import { IngredientDetails } from "../IngredientDetails";
import { Modal } from "../Modal";
import { Card, cardPropTypes } from "./Card";

export const ListItem = ({ type, data, onClick }) => {
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
        <section onClick={onClick}>
            <p className="text text_type_main-large mb-6">{type}</p>
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
}

export const listItemPropTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape(cardPropTypes)).isRequired
}

ListItem.propTypes = listItemPropTypes
