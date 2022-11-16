import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from "./style.module.css";
import { clsx } from 'clsx'
import PropTypes from "prop-types";

export const CompositionListItem = ({ isLocked = false, children }) => {
    const iconStyle = isLocked ? { opacity: 0 } : {}
    return (
        <div className="flex row align-items_center">
            <div style={iconStyle}>
                <DragIcon />
            </div>
            <div className={clsx(style.composition_list_item_children, "ml-2")}>
                {children}
            </div>
        </div>
    )
}

export const CompositionListItemPropTypes = {
    isLocked: PropTypes.bool
}

CompositionListItem.propTypes = CompositionListItemPropTypes
