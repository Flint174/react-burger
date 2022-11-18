import {
    useState,
    useMemo,
    useRef,
    createRef,
    useCallback,
} from "react";
import { Tabs } from "./tabs";
import { clsx } from "clsx";
import style from "./style.module.css";
import { Category } from "./category";

export const BurgerIngredients = () => {
    const createTab = (text, value) => ({ text, value, ref: createRef() })
    const tabs = useMemo(() => ([
        createTab('Булки', 'bun'),
        createTab('Соусы', 'sauce'),
        createTab('Начинки', 'main')
    ]), [])

    const [activeTab, setActiveTab] = useState(tabs[0].value)

    const containerRef = useRef(null)

    const handleTabsClick = (value) => {
        tabs.find(tab => tab.value === value).ref.current.scrollIntoView({ behavior: 'smooth' })
    }

    const handleScroll = () => {
        const distance = (value) => Math.abs(value.ref.current.getBoundingClientRect().y - containerRef.current.getBoundingClientRect().y)
        const tab = tabs.reduce((acc, value) => !acc || distance(acc) > distance(value) ? value : acc, null)
        setActiveTab(tab.value)
    }

    const categoriesList = useMemo(() =>
        tabs.map((tab, index) =>
            (<Category type={tab} key={index} ref={tab.ref} />)
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
