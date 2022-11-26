import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "./link";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import styles from "./styles.module.css";

export const AppHeader = () => {
  return (
    <header
      className={clsx(
        styles.container,
        "flex row nowrap justify-content_space-evenly align-items_center pt-4 pb-4"
      )}
    >
      <nav>
        <ul
          className={clsx(
            styles.list,
            "flex row nowrap justify-content_space-evenly align-items_center"
          )}
        >
          <li>
            <Link icon={BurgerIcon} text="Конструктор" href="/" />
          </li>
          <li>
            <Link icon={ListIcon} text="Лента заказов" href="orders" />
          </li>
        </ul>
      </nav>
      <Logo />
      <Link icon={ProfileIcon} text="Личный кабинет" href="profile" />
    </header>
  );
};
