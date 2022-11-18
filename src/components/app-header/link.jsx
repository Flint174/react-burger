import PropTypes from "prop-types";
import style from './style.module.css'
import { clsx } from "clsx";

export const Link = ({ text, icon, href }) => {
    return (
        <a
            className={clsx(style.link, 'm-5 flex row')}
            href={href}
        >
            {icon}
            <p className="text text_type_main-default ml-2">{text}</p>
        </a>
    )
}

Link.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
}
