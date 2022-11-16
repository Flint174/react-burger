import PropTypes from "prop-types";
import { Category, listItemPropTypes } from "./category";
import { clsx } from "clsx";
import style from "./style.module.css";
import { createRef, useEffect, useState } from "react";
import { useMemo } from "react";

export const Ingredients = ({ categories, currentSection }) => {

    const [itemRefs, setItemRefs] = useState([])

    useEffect(() => {
        console.log('useEffect', categories)
        setItemRefs(prev =>
            categories.map((_, index) =>
                prev[index] || createRef()
            ))
    }, [categories])

    useEffect(() => {
        const index = categories.findIndex(el => el.type.value === currentSection)
        if (index > -1 && itemRefs[index]) {
            itemRefs[index].current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [currentSection])

    const categoriesList = useMemo(() =>
        categories
            .map((category, index) =>
                (<Category type={category.type} cards={category.cards} key={index} ref={itemRefs[index]} />)
            ), [categories, itemRefs])

    return (
        <div className={clsx(style.list_container, 'flex column')}>
            {/* {categories.map((category, index) => (<Category type={category.type} cards={category.cards} key={index} ref={itemRefs[index]} />))} */}
            {categoriesList}
        </div>
    )
}

export const listPropTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape(listItemPropTypes)
    ).isRequired,
    currentSection: PropTypes.string.isRequired,
}

Ingredients.propTypes = listPropTypes
