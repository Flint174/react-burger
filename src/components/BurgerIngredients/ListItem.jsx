import PropTypes from "prop-types";
import Card, { cardPropTypes } from "./Card";

const ListItem = ({ type, data }) => {
    return (
        <>
            <p className="text text_type_main-large mb-6">{type}</p>
            <div className='flex wor wrap mb-10'>
                {data.map((el, index) => (<Card className="ml-4" {...el} key={index} />))}
            </div>
        </>
    )
}

export const listItemPropTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape(cardPropTypes)).isRequired
}

ListItem.propTypes = listItemPropTypes

export default ListItem