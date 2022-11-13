import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { Links } from "./links";
import { Auth } from "./auth";

export const AppHeader = () => {
    return (
        <header className="flex row nowrap justify_content-space_evenly align_items-center pt-4 pb-4">
            <Links />
            <Logo />
            <Auth />
        </header>
    )
}
