import {
    useState,
    useMemo,
    useEffect,
    useRef,
    createRef,
    useCallback,
} from "react";
import { Tabs } from "./tabs";
import { clsx } from "clsx";
import style from "./style.module.css";
import {
    useSelector,
    useDispatch
} from "react-redux";
import { fetchData } from "../../services/slices/ingredients-slice";
import { Category } from "./category";

export const BurgerIngredients = () => {
    const createTab = (text, value) => ({ text, value, ref: createRef() })
    const tabs = useMemo(() => ([
        createTab('Булки', 'bun'),
        createTab('Соусы', 'sauce'),
        createTab('Начинки', 'main')
    ]), [])

    const { data, loading } = useSelector(store => store.ingredientsReducer)

    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(tabs[0].value)

    useEffect(() => {
        if (!data.length && !loading) {
            dispatch(fetchData())
        }
    }, [])

    const containerRef = useRef(null)

    const handleTabsClick = useCallback((value) => {
        tabs.find(tab => tab.value === value).ref.current.scrollIntoView({ behavior: 'smooth' })
    }, [tabs])

    const handleScroll = useCallback(() => {
        const threshold = 2
        const index = tabs.filter(tab => tab.ref.current.getBoundingClientRect().y - threshold <= containerRef.current.getBoundingClientRect().y).length - 1
        setActiveTab(tabs[index].value)
    }, [tabs])

    const categoriesList = useMemo(() =>
        tabs.map((category, index) =>
            (<Category type={category} key={index} ref={category.ref} />)
        ), [tabs])

    return (
        <section className={clsx(style.main_container)}>

            <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h1>

            <Tabs value={activeTab} tabs={tabs} onClick={handleTabsClick} />

            <div
                ref={containerRef}
                className={clsx(style.list_container, 'flex column')}
                onScroll={handleScroll}
            >
                {categoriesList}
            </div>
        </section>
    )
}
