import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { Links } from "./Links";
import { Auth } from "./Auth";

export const AppHeader = () => {
    return (
        <header className="flex row nowrap justify_content-space_evenly align_items-center pt-4 pb-4">
            <Links />
            <Logo />
            <Auth />
        </header>
    )
}
