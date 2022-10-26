import style from "./AppHeader.module.css";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import Space from "../Space/Space";

const Container = (props) => {
    return (
        <div className={`${style.container} ${props.className}`} style={props.style}>
            {props.children}
        </div>
    )
}

const Link = (props) => {
    return (
        <Container style={{ margin: 5 }}>
            {props.icon}
            <Space size='2' />
            <p className="text text_type_main-default"> {props.text}</p >
        </Container >
    )
}

const Links = (props) => {
    return (
        <>
            <Container>
                <Link icon={<BurgerIcon />} text='Конструктор' />
                <Link icon={<ListIcon />} text='Лента заказов' />
            </Container>
        </>
    )
}

const Auth = (props) => {
    return (
        <Link icon={<ProfileIcon />} text='Личный кабинет' />
    )
}

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