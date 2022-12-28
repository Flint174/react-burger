import clsx from "clsx";
import { FC, useMemo } from "react";
import { useAppSelector } from "../../hooks/use-store";
import { Order } from "../../utils/types";
import styles from "./styles.module.css";

interface OrderCardProps {
  order: Order;
}

export const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const { data: ingredients } = useAppSelector(
    (store) => store.ingredientsReducer
  );
  const pictures = useMemo(() => {
    const orderLen = order.ingredients.length;
    const retLenMax = 6;
    const retOverflow = orderLen - retLenMax;
    const ret = order.ingredients
      .slice(0, retLenMax)
      .map((ingredientId, index) => {
        const ingredient = ingredients.find((el) => el._id === ingredientId);
        return (
          <>
            <div
              key={index}
              className={styles.items_picture_container}
              style={{
                position: "relative",
                right: index * 16,
                zIndex: 100 - index * 2,
              }}
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
              {index === retLenMax - 1 && (
                <div
                  className={clsx(
                    styles.items_picture_container,
                    styles.items_overflow
                  )}
                >
                  <div
                    className={clsx(
                      styles.items_picture,
                      "text text_type_main-small"
                    )}
                  >
                    +{retOverflow}
                  </div>
                </div>
              )}
            </div>
          </>
        );
      });
    if (retOverflow > 0) return ret;
  }, [order, ingredients]);

  return (
    <article className={clsx(styles.container, "flex column p-6 gap-6")}>
      <h2 className="text text_type_digits-default">
        Order number
        <span
          className={clsx(
            styles.title_update,
            "text text_type_main-default text_color_inactive"
          )}
        >
          update
        </span>
      </h2>
      <div className="flex column gap-2">
        <div className="text text_type_main-medium">title</div>
        <div className="text text_type_main-default">type</div>
      </div>
      <div className="flex row gap-6">
        <div
          className={clsx(styles.items_list, "flex row justify-content_start")}
        >
          {pictures}
        </div>
        <div>price</div>
      </div>
    </article>
  );
};
