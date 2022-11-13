import PropTypes from "prop-types";
import { clsx } from "clsx";

export const Container = ({ extraClass, children }) => {
    return (
        <nav className={clsx('flex row nowrap justify_content-space_evenly align_items-center', extraClass)}>
            {children}
        </nav>
    )
}

export const containerPropTypes = {
    extraClass: PropTypes.string
}

Container.propTypes = containerPropTypes