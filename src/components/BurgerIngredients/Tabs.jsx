import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const Tabs = ({ value, tabs, onClick }) => {

    return (
        <div style={{ display: 'flex' }}>
            {
                tabs.map((tab, index) => (
                    <Tab value={tab.value} active={value === tab.value} key={index} onClick={onClick}>
                        {tab.text}
                    </Tab>
                ))
            }
            {/* <Tab value="one" active={current === 'one'} onClick={onClick}>
                One
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={onClick}>
                Two
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={onClick}>
                Three
            </Tab> */}
        </div>
    )
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.exact({
            value: PropTypes.string,
            text: PropTypes.string
        })
    ),
    value: PropTypes.string,
    onClick: PropTypes.func
}

export default Tabs