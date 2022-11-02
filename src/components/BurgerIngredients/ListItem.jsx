import PropTypes from "prop-types";
import { useState } from "react";
import { IngredientDetails } from "../IngredientDetails";
import { Card, cardPropTypes } from "./Card";

export const ListItem = ({ type, data, onClick }) => {
    const [isToggled, setIsToggled] = useState(false)
    const [info, setInfo] = useState()

    function closeOrderDetails () {
        setIsToggled(false)
    }

    function openOrderDetails (value) {
        console.log('data', data)
        console.log('set info', value)
        setInfo(value)
        setIsToggled(true)
    }
    return (
        <section onClick={onClick}>
            <p className="text text_type_main-large mb-6">{type}</p>
            <div className='flex wor wrap mb-10'>
                {data.map((el, index) => (<Card className="ml-4" {...el} key={el._id} onClick={() => openOrderDetails(el)} />))}
            </div>
            <IngredientDetails show={isToggled} onClose={closeOrderDetails} data={info} />
        </section>
    )
}

export const listItemPropTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape(cardPropTypes)).isRequired
}

ListItem.propTypes = listItemPropTypes
