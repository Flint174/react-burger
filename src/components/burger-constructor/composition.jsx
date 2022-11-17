import { Bun } from "./bun";
import { CompositionList } from "./composition-list";
import { useDrop } from 'react-dnd'
import { dragTypes } from "../../utils/constants";
import style from "./style.module.css";
import { clsx } from "clsx";

export const Composition = () => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: dragTypes.INGREDIENT,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const className = clsx(
        style.composition_container,
        canDrop && (isOver ? style.composition_container_isover : style.composition_container_candrop),
        "flex column gap-4 mt-25"
    )

    return (
        <div
            ref={drop}
            className={className}
            style={style}
        >
            <Bun type={'top'} />
            <CompositionList />
            <Bun type={'bottom'} />
        </div>
    )
}
