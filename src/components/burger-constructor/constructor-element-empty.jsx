import PropTypes from "prop-types";
import style from "./style.module.css";
import { clsx } from 'clsx'

export const ConstructorElementEmpty = ({ type = 'default', extraClass }) => {

    const computedStyle = type === 'top'
        ? style.empty_element_top
        : type === 'bottom'
            ? style.empty_element_bottom
            : style.empty_element_default

    const text = type === 'default' ? 'Выберите ингредиент' : 'Выберите булку'

    return (
        <div className={clsx(computedStyle, extraClass)}>
            <p className='text text_type_main-default text_color_inactive'>
                {text}
            </p>
        </div>
    )
}

export const constructorElementEmptyProps = {
    type: PropTypes.oneOf(['top', 'default', 'bottom']),
    extraClass: PropTypes.string
}

ConstructorElementEmpty.propTypes = constructorElementEmptyProps
