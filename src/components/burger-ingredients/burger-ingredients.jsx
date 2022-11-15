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
import {
    fetchData,
    // setLoading
} from "../../services/slices/ingredients-slice";

export const BurgerIngredients = () => {
    const createTab = (name, value) => ({ text: name, value })
    const tabs = useMemo(() => [
        createTab('Булки', 'bun'),
        createTab('Соусы', 'sauce'),
        createTab('Начинки', 'main')
    ], [])
    const { data, loading } = useSelector(store => store.ingredientsReducer)
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(Array.isArray(tabs) && tabs.length ? tabs[0].value : '')

    const list = useMemo(() =>
        tabs.map(tab => ({
            type: tab,
            data: data.filter(el => el.type === tab.value)
        })), [data])

    useEffect(() => {
        // console.log('mount', { data, loading })
        if (!data.length && !loading) {
            // console.log('fetch')
            // dispatch(setLoading(true))
            dispatch(fetchData())
        }
        return () => {
            console.log('unmount')
        }
    }, [])

    return (
        <section className={clsx(style.main_container)}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <Tabs value={activeTab} tabs={tabs} onClick={setActiveTab} />
            <Ingredients data={list} currentSection={activeTab} />
        </section>
    )
}
