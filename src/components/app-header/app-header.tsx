import { HeaderLink } from "./link";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

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
            <HeaderLink icon={BurgerIcon} text="Конструктор" href="/" />
          </li>
          <li>
            <HeaderLink icon={ListIcon} text="Лента заказов" href="feed" />
          </li>
        </ul>
      </nav>

      <Link to="/">
        <Logo />
      </Link>
      <HeaderLink icon={ProfileIcon} text="Личный кабинет" href="profile" />
    </header>
  );
};
