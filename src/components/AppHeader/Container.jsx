import style from "./style.module.css";
import { clsx } from "clsx";

const Container = (props) => {
    return (
        <div className={clsx(style.container, props.className)} style={props.style}>
            {props.children}
        </div>
    )
}

export default Container