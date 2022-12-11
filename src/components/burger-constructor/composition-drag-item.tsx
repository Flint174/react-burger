import { FC, ReactElement, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { dragTypes } from "../../utils/constants";
import { moveIngredient } from "../../services/slices/constructor-slice";
import { useAppDispatch } from "../../hooks/use-store";
import type { Identifier } from "dnd-core";

interface CompositionDragItemProps {
  id: string;
  index: number;
  children?: ReactElement;
}

interface DragObject {
  id: string;
  index: number;
}

interface CollectedProps {
  handlerId: Identifier | null;
}

export const CompositionDragItem: FC<CompositionDragItemProps> = ({
  id,
  index,
  children,
}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragObject, undefined, CollectedProps>(
    () => ({
      accept: dragTypes.CONSTRUCTOR,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) {
          return;
        }
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        dispatch(moveIngredient({ dragIndex, hoverIndex }));
        item.index = hoverIndex;
      },
    })
  );
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragTypes.CONSTRUCTOR,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      {children}
    </div>
  );
};
