import PropTypes from "prop-types";
import styles from "./styles.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/types";
import { dragTypes } from "../../utils/constants";
import { clsx } from "clsx";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, setBun } from "../../services/slices/constructor-slice";
import { Link, useLocation } from "react-router-dom";

export const Card = ({ info, extraClass }) => {
  const location = useLocation();
  const id = info._id;
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((store) => store.constructorReducer);
  const { image, price, name } = info;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragTypes.INGREDIENT,
    item: info,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (item.type === "bun") {
          dispatch(setBun(info));
        } else {
          dispatch(addIngredient(info));
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const dragStyle = isDragging ? { opacity: 0.2 } : {};

  const count =
    info.type === "bun"
      ? (bun || 0) && (bun._id === info._id) * 2
      : ingredients.filter((el) => el._id === info._id).length;

  return (
    <Link
      key={id}
      to={{
        pathname: `/ingredients/${id}`,
      }}
      state={{ background: location }}
      className={styles.link}
    >
      <div
        ref={drag}
        className={clsx(
          styles.card_container,
          "flex column align-items_center",
          extraClass
        )}
        style={dragStyle}
      >
        {!!count && <Counter count={count} />}
        <img
          className={clsx(styles.card_img, "ml-4 mr-4")}
          src={image}
          alt="Oops"
        />
        <div className="flex row align-items_center mt-1 mb-1">
          <p className="text text_type_digits-default mr-1">{price}</p>
          <CurrencyIcon />
        </div>
        <p className={clsx(styles.card_name, "text text_type_main-default")}>
          {name}
        </p>
      </div>
    </Link>
  );
};

Card.propTypes = {
  info: ingredientPropType.isRequired,
  extraClass: PropTypes.string,
};
