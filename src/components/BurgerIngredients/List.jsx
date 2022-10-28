import PropTypes from "prop-types";
import ListItem, { listItemPropTypes } from "./ListItem";
import style from "./style.module.css";

const List = ({ data, height }) => {
    return (
        <div className={style.list_container} style={{ height: height }}>
            {data.map((item, index) => (<ListItem type={item.type} data={item.data} key={index} />))}
        </div >
    )
}

export const listPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape(listItemPropTypes)
    ).isRequired,
    height: PropTypes.number.isRequired
}

List.propTypes = listPropTypes

export default List