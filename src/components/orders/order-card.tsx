import clsx from "clsx";
import { FC } from "react";
import styles from "./styles.module.css";

export const OrderCard: FC = () => {
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
      <div className="flex row">
        <div className={styles.items_list}>items</div>
        <div>price</div>
      </div>
    </article>
  );
};
