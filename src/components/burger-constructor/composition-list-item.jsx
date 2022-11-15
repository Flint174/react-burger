import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from "./style.module.css";
import { clsx } from 'clsx'

export const CompositionListItem = ({ children }) => {
    return (
        <div className="flex row align-items_center">
            <DragIcon />
            <div className={clsx(style.composition_list_item_children, "ml-2")}>
                {children}
            </div>
        </div>
    )
}
