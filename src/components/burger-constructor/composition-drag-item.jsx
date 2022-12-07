import PropTypes from "prop-types";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { dragTypes } from "../../utils/constants";
import { moveIngredient } from "../../services/slices/constructor-slice";

export const CompositionDragItem = ({ id, index, children }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
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
  });
  const [{ isDragging }, drag] = useDrag({
    type: dragTypes.CONSTRUCTOR,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      {children}
    </div>
  );
};

CompositionDragItem.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
