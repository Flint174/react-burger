import PropTypes from "prop-types";

export const ingredientType = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number
}

export const modalType = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    isOpen: PropTypes.bool.isRequired
}

export const ingredientPropType = PropTypes.shape(ingredientType)

export const categoryType = {
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export const categoryPropType = PropTypes.shape(categoryType)

export const categoriesPropType = PropTypes.arrayOf(categoryPropType)
