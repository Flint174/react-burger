import PropTypes from "prop-types";
import Card, { cardPropTypes } from "./Card";
import style from "./style.module.css";

const ListItem = ({ type, data }) => {
    return (
        <>
            <p className="text text_type_main-large mt-10 mb-6">{type}</p>
            <div className={style.listitem_container}>
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