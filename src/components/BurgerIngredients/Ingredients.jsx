import PropTypes from "prop-types";
import { ListItem, listItemPropTypes } from "./ListItem";
import { clsx } from "clsx";
import style from "./style.module.css";
import { createRef, useEffect, useState } from "react";

export const Ingredients = ({ data, height, currentSection }) => {
    const [itemRefs, setItemRefs] = useState([])

    useEffect(() => {
        setItemRefs(prev =>
            data.map((_, index) =>
                prev[index] || createRef()
            ))
    }, [data])

    useEffect(() => {
        const index = data.findIndex(el => el.type.value === currentSection)
        if (index > -1 && itemRefs[index]) {
            itemRefs[index].current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [currentSection])

    return (
        <div className={clsx(style.list_container, 'flex column')} style={{ height: height }}>
            {data.map((item, index) => (<ListItem type={item.type} data={item.data} key={index} ref={itemRefs[index]} />))}
        </div>
    )
}

export const listPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape(listItemPropTypes)
    ).isRequired,
    currentSection: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired
}

Ingredients.propTypes = listPropTypes
