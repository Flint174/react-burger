import Container from "./Container";
import Link from "./Link";
import {
    BurgerIcon,
    ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Links = () => {
    return (
        <Container>
            <Link icon={<BurgerIcon />} text='Конструктор' />
            <Link icon={<ListIcon />} text='Лента заказов' />
        </Container>
    )
}

export default Links