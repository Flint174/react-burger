import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { categoriesPropType } from "../../utils/types";
import { useMemo } from "react";

export const Tabs = ({ value, tabs, onClick }) => {

    const tabsList = useMemo(() =>
        tabs.map((tab, index) => (
            <Tab value={tab.value} active={value === tab.value} key={index} onClick={onClick}>
                {tab.text}
            </Tab>
        )), [tabs, value, onClick])

    return (
        <div className="flex mb-10">
            {tabsList}
        </div>
    )
}

Tabs.propTypes = {
    tabs: categoriesPropType.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}
