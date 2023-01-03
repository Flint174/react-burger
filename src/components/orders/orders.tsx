import clsx from "clsx";
import { FC } from "react";
import { useAppSelector } from "../../hooks/use-store";
import { OrderCard } from "./order-card";
import styles from "./styles.module.css";

interface OrdersProps {
  showStatus?: boolean;
  height: number | string;
}

export const Orders: FC<OrdersProps> = ({ showStatus = false, height }) => {
  const { orders } = useAppSelector((store) => store.ordersFeedReducer);

  return (
    <section
      className={clsx(styles.orders_container, "flex column gap-4 pr-2")}
      style={{ maxHeight: height }}
    >
      {orders.map((order) => (
        <OrderCard order={order} showStatus={showStatus} key={order.number} />
      ))}
    </section>
  );
};
