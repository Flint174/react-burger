import PropTypes from "prop-types";
import { Category } from "./category";
import { clsx } from "clsx";
import style from "./style.module.css";
import { createRef, useEffect, useState } from "react";
import { useMemo } from "react";
import { categoriesPropType } from "../../utils/types";

export const Ingredients = ({ categories, currentSection }) => {

    const [itemRefs, setItemRefs] = useState([])

    useEffect(() => {
        setItemRefs(prev =>
            categories.map((_, index) =>
                prev[index] || createRef()
            ))
    }, [categories])

    useEffect(() => {
        const index = categories.findIndex(el => el.value === currentSection)
        if (index > -1 && itemRefs[index]) {
            itemRefs[index].current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [currentSection])

    const categoriesList = useMemo(() =>
        Array.isArray(categories) && categories.length &&
        categories
            .map((category, index) =>
                (<Category type={category} key={index} ref={itemRefs[index]} />)
            ), [categories, itemRefs])

    return (
        <div className={clsx(style.list_container, 'flex column')}>
            {categoriesList}
        </div>
    )
}

export const ingredientsPropTypes = {
    categories: categoriesPropType.isRequired,
    currentSection: PropTypes.string.isRequired,
}

Ingredients.propTypes = ingredientsPropTypes
