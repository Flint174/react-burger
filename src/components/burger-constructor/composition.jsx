import { Bun } from "./bun";
import { CompositionList } from "./composition-list";
import { useDrop } from 'react-dnd'
import { dragTypes } from "../../utils/constants";

export const Composition = () => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: dragTypes.INGREDIENT,
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))
    return (
        <div
            ref={drop}
            className="flex column gap-4 mt-25"
        >
            <Bun type={'top'} />
            <CompositionList />
            <Bun type={'bottom'} />
        </div>
    )
}
