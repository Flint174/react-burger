import { useState, useMemo, useRef, createRef } from "react";
import { Tabs } from "./tabs";
import { clsx } from "clsx";
import styles from "./styles.module.css";
import { Category } from "./category";

export const BurgerIngredients = () => {
  // useMemo применен для создания массива ref-ов
  const tabs = useMemo(
    () => [
      { text: "Булки", value: "bun", ref: createRef() },
      { text: "Соусы", value: "sauce", ref: createRef() },
      { text: "Начинки", value: "main", ref: createRef() },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const containerRef = useRef(null);

  const handleTabsClick = (value) => {
    tabs
      .find((tab) => tab.value === value)
      .ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    const distance = (value) =>
      Math.abs(
        value.ref.current.getBoundingClientRect().y -
          containerRef.current.getBoundingClientRect().y
      );
    const tab = tabs.reduce(
      (acc, value) => (!acc || distance(acc) > distance(value) ? value : acc),
      null
    );
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
