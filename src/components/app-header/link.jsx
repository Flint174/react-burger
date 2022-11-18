import PropTypes from "prop-types";
import { Container } from './container'

export const Link = ({ text, icon }) => {
    return (
        <Container extraClass='m-5'>
            {icon}
            <p className="text text_type_main-default ml-2">{text}</p>
        </Container >
    )
}

Link.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired
}
