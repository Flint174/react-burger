import clsx from "clsx";
import { FC } from "react";
import styles from "./styles.module.css";

interface OrderDetailsProps {
  isModal?: boolean;
}

export const OrderDetails: FC<OrderDetailsProps> = ({ isModal = false }) => {
  return (
    <div className={clsx(styles.container, "m-10")}>
      <div
        className={clsx(
          styles.title_container,
          "flex row align-items_center mt-10 ml-10 mr-10",
          { "justify-content_center": !isModal }
        )}
      >
        <h3 className="text text_type_digits-default">
          {/* #{`000000${order.number}`.slice(-6)} */}
        </h3>
      </div>
    </div>
  );
};
