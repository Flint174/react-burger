import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { Links } from "./links";
import { Auth } from "./auth";

export const AppHeader = () => {
    return (
        <header className="flex row nowrap justify-content_space-evenly align-items_center pt-4 pb-4">
            <Links />
            <Logo />
            <Auth />
        </header>
    )
}
