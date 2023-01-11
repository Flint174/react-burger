import clsx from "clsx";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/use-store";
import { OrderCard } from "./order-card";
import styles from "./styles.module.css";

interface OrdersProps {
  showStatus?: boolean;
  height: number | string;
}

export const Orders: FC<OrdersProps> = ({ showStatus = false, height }) => {
  const { orders } = useAppSelector((store) => store.ordersFeedReducer);
  const location = useLocation();

  return (
    <section
      className={clsx(styles.orders_container, "flex column gap-4 pr-2")}
      style={{ maxHeight: height }}
    >
      {orders.map((order) => (
        <Link
          to={{ pathname: `${location.pathname}/${order.number}` }}
          state={{ background: location }}
          key={order.number}
        >
          <OrderCard order={order} showStatus={showStatus} />
        </Link>
      ))}
    </section>
  );
};
