import { Container } from "./container";
import { Link } from "./link";
import {
    BurgerIcon,
    ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Links = () => {
    return (
        <Container>
            <Link icon={<BurgerIcon />} text='Конструктор' />
            <Link icon={<ListIcon />} text='Лента заказов' />
        </Container>
    )
}
