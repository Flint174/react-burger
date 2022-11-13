import PropTypes from "prop-types";
import {
    useState,
    useMemo,
    useEffect,
} from "react";
import { Tabs } from "./tabs";
import { Ingredients } from "./ingredients";
import { clsx } from "clsx";
import style from "./style.module.css";
import {
    useSelector,
    useDispatch
} from "react-redux";
// import { handleError, request } from "../../utils/request";
// import { INGREDIENTS_URL } from "../../utils/constants";
import {
    // setData, 
    fetchData
} from "../../services/slices/ingredients-slice";

export const BurgerIngredients = ({ height }) => {
    const createTab = (name, value) => ({ text: name, value })
    const tabs = useMemo(() => [
        createTab('Булки', 'bun'),
        createTab('Соусы', 'sauce'),
        createTab('Начинки', 'main')
    ], [])
    const data = useSelector(store => store.ingredientsReducer.data)
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(Array.isArray(tabs) && tabs.length ? tabs[0].value : '')

    const list = useMemo(() =>
        tabs.map(tab => ({
            type: tab,
            data: data.filter(el => el.type === tab.value)
        })), [data])

    useEffect(() => {
        // request(INGREDIENTS_URL)
        //     .then(json => dispatch(setData(json.data)))
        //     .catch(handleError)
        dispatch(fetchData())
    }, [])

    return (
        <section className={clsx(style.main_container)}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <Tabs value={activeTab} tabs={tabs} onClick={setActiveTab} />
            <Ingredients data={list} height={height} currentSection={activeTab} />
        </section>
    )
}

export const burgerIngredientsPropTypes = {
    height: PropTypes.number.isRequired
}

BurgerIngredients.propTypes = burgerIngredientsPropTypes
