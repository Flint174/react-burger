import PropTypes from "prop-types";
import { clsx } from "clsx";

export const Container = ({ extraClass, children }) => {
    return (
        <nav className={clsx('flex row nowrap justify-content_space-evenly align-items_center', extraClass)}>
            {children}
        </nav>
    )
}

Container.propTypes = {
    extraClass: PropTypes.string
}
