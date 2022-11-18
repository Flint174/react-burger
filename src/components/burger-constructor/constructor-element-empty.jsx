import PropTypes from "prop-types";
import style from "./style.module.css";
import { clsx } from 'clsx'

export const ConstructorElementEmpty = ({ type = 'default', extraClass }) => {

    const text = type === 'default' ? 'Выберите ингредиент' : 'Выберите булку'

    return (
        <div className={
            clsx(
                { [style.empty_element_top]: type === 'top' },
                { [style.empty_element_default]: type === 'default' },
                { [style.empty_element_bottom]: type === 'bottom' },
                extraClass
            )}
        >
            <p className='text text_type_main-default text_color_inactive'>
                {text}
            </p>
        </div>
    )
}

ConstructorElementEmpty.propTypes = {
    type: PropTypes.oneOf(['top', 'default', 'bottom']),
    extraClass: PropTypes.string
}
