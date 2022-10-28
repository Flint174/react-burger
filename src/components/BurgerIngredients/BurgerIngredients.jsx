import PropTypes from "prop-types";
import { useState } from "react";
import Tabs from "./Tabs";
import List from "./List";

const BurderIngredients = ({ data, height }) => {
    const tabs = [
        {
            value: '1',
            text: 'Булки'
        },
        {
            value: '2',
            text: 'Соусы'
        },
        {
            value: '3',
            text: 'Начинки'
        },
    ]
    const [activeTab, setActiveTab] = useState(tabs[0].value)
    const list = Object.entries(
        data.reduce((acc, value) => (
            {
                ...acc,
                [value.type]: Array.isArray(acc[value.type]) ? [].concat(acc[value.type], value) : [value]

            }), {})
    ).map(([key, value]) => ({ type: key, data: value }))

    console.log('list', { data, list })

    return (
        <div>
            <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
            <Tabs value={activeTab} tabs={tabs} onClick={setActiveTab} />
            <List data={list} height={height} />
        </div>
    )
}

export const burgerIngredientsPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.string,
            price: PropTypes.number,
            image: PropTypes.string,
            image_mobile: PropTypes.string,
            image_large: PropTypes.string,
        })
    ).isRequired,
    height: PropTypes.number.isRequired
}

BurderIngredients.propTypes = burgerIngredientsPropTypes

export default BurderIngredients