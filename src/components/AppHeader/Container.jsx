import style from "./AppHeader.module.css";

const Container = (props) => {
    return (
        <div className={`${style.container} ${props.className}`} style={props.style}>
            {props.children}
        </div>
    )
}

export default Container