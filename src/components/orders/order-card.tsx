import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/use-store";
import { IngredientType, Order } from "../../utils/types";
import styles from "./styles.module.css";
import { formattedDate } from "../../utils/formatted-date";
import { orderStatus } from "../../utils/orderStatus";

interface OrderCardProps {
  order: Order;
  showStatus?: boolean;
}

export const OrderCard: FC<OrderCardProps> = ({
  order,
  showStatus = false,
}) => {
  const { data: ingredients } = useAppSelector(
    (store) => store.ingredientsReducer
  );
  const [pictures, setPictures] = useState<JSX.Element[]>([]);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const orderLen = order.ingredients.length;
    const picLenMax = 6;
    const picOverflow = orderLen - picLenMax;
    let _price = 0;
    let _ingredients: IngredientType[] = [];
    for (const id of order.ingredients) {
      const ingredient = ingredients.find((el) => el._id === id);
      if (!ingredient) {
        setError(true);
        return;
      }
      _price += ingredient.price;
      _ingredients.push(ingredient);
    }
    setPrice(_price);
    setPictures(
      _ingredients.slice(0, picLenMax).map((ingredient, index) => (
        <div
          key={index}
          className={styles.items_picture_container}
          style={{ zIndex: 100 - index }}
        >
          <picture className={styles.items_picture}>
            <source
              srcSet={[
                ingredient?.image,
                ingredient?.image_mobile,
                ingredient?.image_large,
              ].join(", ")}
            />
            <img
              src={ingredient?.image_mobile}
              alt="ingredient"
              width="112"
              height="56"
            />
          </picture>
          {!index && picOverflow > 0 && (
            <div
              className={clsx(
                styles.items_picture_container,
                styles.items_picture,
                styles.items_overflow
              )}
            >
              <div
                className={clsx(
                  styles.items_picture,
                  "text text_type_main-small"
                )}
              >
                +{picOverflow}
              </div>
            </div>
          )}
        </div>
      ))
    );
  }, [order, ingredients]);

  const status = orderStatus(order.status);

  const updateDate = formattedDate(order.createdAt);

  return (
    <>
      {!error && (
        <article
          className={clsx(styles.card_container, "flex column p-6 gap-6")}
        >
          <div className="text text_type_digits-default">
            #{`000000${order.number}`.slice(-6)}
            <span
              className={clsx(
                styles.title_update,
                "text text_type_main-default text_color_inactive"
              )}
            >
              {updateDate}
            </span>
          </div>
          <div className="flex column gap-2">
            <h2 className="text text_type_main-medium">{order.name}</h2>
            {showStatus && (
              <div className="text text_type_main-default">{status}</div>
            )}
          </div>
          <div className="flex row gap-6">
            <div
              className={clsx(
                styles.items_list,
                "flex row-reverse justify-content_start"
              )}
            >
              {pictures}
            </div>
            <div className="flex row align-items_center justify-content_center gap-2">
              <div className="text text_type_digits-default">{price}</div>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </article>
      )}
    </>
  );
};