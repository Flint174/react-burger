import PropTypes from "prop-types";
import Container from './Container'

const Link = (props) => {
    return (
        <Container className='m-5'>
            {props.icon}
            <p className="text text_type_main-default ml-2">{props.text}</p>
        </Container >
    )
}

Link.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string
}

export default Link