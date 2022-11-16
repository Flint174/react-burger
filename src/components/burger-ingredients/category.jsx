import PropTypes from "prop-types";
import { forwardRef, useState, useMemo } from "react";
import { IngredientDetails } from "../ingredient-details";
import { Modal } from "../modal";
import {
    Card,
    cardPropTypes
} from "./card";

export const Category = forwardRef(({ type, cards, onClick }, ref) => {
    const [show, setShow] = useState(false)
    const [info, setInfo] = useState()

    function closeOrderDetails () {
        setShow(false)
    }

    function openOrderDetails (value) {
        setInfo(value)
        setShow(true)
    }

    const cardsList = useMemo(() =>
        cards
            .filter(card => {
                console.log('filter', card)
                return card
            })
            .map(card =>
                (<Card extraClass="ml-4" info={card} key={card._id} onClick={() => openOrderDetails(card)} />)
            ), [cards])

    return (
        <section onClick={onClick} ref={ref}>
            <h2 className="text text_type_main-large mb-6">{type.text || type.value}</h2>
            <div className='flex wor wrap mb-10'>
                {/* {cards.filter(card => card !== undefined).map(card => (<Card extraClass="ml-4" info={card} key={card._id} onClick={() => openOrderDetails(card)} />))} */}
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

export const listItemPropTypes = {
    type: PropTypes.shape({
        text: PropTypes.string,
        value: PropTypes.string,
    }).isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape(cardPropTypes)).isRequired
}

Category.propTypes = listItemPropTypes
