import PropTypes from "prop-types";
import { clsx } from "clsx";

export const Container = ({ extraClass, children }) => {
    return (
        <nav className={clsx('flex row nowrap justify-content_space-evenly align-items_center', extraClass)}>
            {children}
        </nav>
    )
}

export const containerPropTypes = {
    extraClass: PropTypes.string
}

Container.propTypes = containerPropTypes
