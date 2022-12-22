import { useState, useMemo, useRef, createRef, RefObject } from "react";
import { Tabs } from "./tabs";
import { clsx } from "clsx";
import styles from "./styles.module.css";
import { Category } from "./category";

interface Tab {
  text: string;
  value: string;
  ref: RefObject<HTMLDivElement>;
}

export const BurgerIngredients = () => {
  // useMemo применен для создания массива ref-ов
  const tabs = useMemo<Tab[]>(
    () => [
      { text: "Булки", value: "bun", ref: createRef<HTMLDivElement>() },
      { text: "Соусы", value: "sauce", ref: createRef<HTMLDivElement>() },
      { text: "Начинки", value: "main", ref: createRef<HTMLDivElement>() },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleTabsClick = (value: string) => {
    for (const tab of tabs) {
      if (tab.value === value) {
        tab.ref.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScroll = () => {
    const distance = (value: Tab) =>
      value.ref.current === null || containerRef.current === null
        ? 0
        : Math.abs(
            value.ref.current.getBoundingClientRect().y -
              containerRef.current.getBoundingClientRect().y
          );
    const tab = tabs.reduce((acc, value) => {
      return distance(acc) > distance(value) ? value : acc;
    }, tabs[0]);
    setActiveTab(tab.value);
  };

  const categoriesList = useMemo(
    () =>
      tabs.map((tab, index) => (
        <Category type={tab} key={index} ref={tab.ref} />
      )),
    [tabs]
  );

  return (
    <section className={clsx(styles.main_container)}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <Tabs value={activeTab} tabs={tabs} onClick={handleTabsClick} />

      <div
        ref={containerRef}
        className={clsx(styles.list_container, "flex column")}
        onScroll={handleScroll}
      >
        {categoriesList}
      </div>
    </section>
  );
};
