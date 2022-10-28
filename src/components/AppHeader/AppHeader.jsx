import style from "./style.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import Links from "./Links";
import Auth from "./Auth";
import { clsx } from "clsx";

const AppHeader = (props) => {
    return (
        <header className={clsx(style.container, 'pt-4 pb-4', props.className)}>
            <Links />
            <Logo />
            <Auth />
        </header>
    )
}

export default AppHeader