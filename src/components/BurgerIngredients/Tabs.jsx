import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const Tabs = ({ value, tabs, onClick }) => {

    return (
        <div className="flex mb-10">
            {
                tabs.map((tab, index) => (
                    <Tab value={tab.value} active={value === tab.value} key={index} onClick={onClick}>
                        {tab.text}
                    </Tab>
                ))
            }
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