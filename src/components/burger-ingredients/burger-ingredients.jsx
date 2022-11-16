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
import { fetchData } from "../../services/slices/ingredients-slice";

export const BurgerIngredients = () => {
    const createTab = (text, value) => ({ text, value })
    const tabs = useMemo(() => ([
        createTab('Булки', 'bun'),
        createTab('Соусы', 'sauce'),
        createTab('Начинки', 'main')
    ]), [])

    const { data, loading } = useSelector(store => store.ingredientsReducer)

    const categories = useMemo(() => tabs.map(tab => ({
        type: tab,
        cards: data.filter(el => el.type === tab.value)
    })), [data, tabs])

    console.log('burger', categories)

    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(tabs[0].value)

    useEffect(() => {
        if (!data.length && !loading) {
            dispatch(fetchData())
        }
    }, [])

    return (
        <section className={clsx(style.main_container)}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <Tabs value={activeTab} tabs={tabs} onClick={setActiveTab} />
            <Ingredients categories={categories} currentSection={activeTab} />
        </section>
    )
}
