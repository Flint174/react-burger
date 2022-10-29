import { clsx } from "clsx";

const Container = (props) => {
    return (
        <div className={clsx('flex row nowrap justify_content-space_evenly align_items-center', props.className)} style={props.style}>
            {props.children}
        </div>
    )
}

export default Container