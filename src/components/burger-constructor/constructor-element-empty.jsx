import PropTypes from "prop-types";
import style from "./style.module.css";
import { clsx } from 'clsx'

export const ConstructorElementEmpty = ({ type, text, extraClass }) => {

    const computedStyle = type === 'top'
        ? style['empty-element_top']
        : type === 'bottom'
            ? style['empty-element_bottom']
            : style['empty-element_default']

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
    text: PropTypes.string,
    extraClass: PropTypes.string
}

ConstructorElementEmpty.propTypes = constructorElementEmptyProps
