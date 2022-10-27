import PropTypes from "prop-types";
import Container from './Container'
import Space from "../Space";

const Link = (props) => {
    return (
        <Container className='m-5'>
            {props.icon}
            <Space size='2' />
            <p className="text text_type_main-default">{props.text}</p>
        </Container >
    )
}

Link.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string
}

export default Link