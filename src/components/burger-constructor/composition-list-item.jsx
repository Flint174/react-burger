import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from "./style.module.css";
import { clsx } from 'clsx'
import PropTypes from "prop-types";

export const CompositionListItem = ({ isLocked = false, children }) => {
    return (
        <div className="flex row align-items_center">
            <div className={clsx(isLocked && style.composition_list_item_invisible)}>
                <DragIcon />
            </div>
            <div className={clsx(style.composition_list_item_children, "ml-2")}>
                {children}
            </div>
        </div>
    )
}

CompositionListItem.propTypes = {
    isLocked: PropTypes.bool
}
