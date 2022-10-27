import style from "./AppHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import Links from "./Links";
import Auth from "./Auth";

const AppHeader = (props) => {
    return (
        <header className={`${style.container} pt-4 pb-4 ${props.className}`}>
            <Links />
            <Logo />
            <Auth />
        </header>
    )
}

export default AppHeader