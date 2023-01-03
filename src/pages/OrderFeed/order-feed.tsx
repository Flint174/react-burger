import clsx from "clsx";
import { FC, useEffect, useRef } from "react";
import { Orders } from "../../components/orders/orders";
import { useAppDispatch, useAppSelector } from "../../hooks/use-store";
import {
  ordersWsConnect,
  ordersWsDisconnect,
} from "../../services/actions/orders-ws-actions";
import { WS_ALL_URL } from "../../utils/constants";
import { Order } from "../../utils/types";
import styles from "./styles.module.css";

function getOrdersByKey(
  orders: Order[],
  key: Order["status"],
  options?: { extraClass?: string }
) {
  return orders
    .filter((order) => order.status === key)
    .slice(0, 10)
    .map((order) => (
      <div key={order._id} className={clsx(options?.extraClass)}>
        {order.number}
      </div>
    ));
}

export const OrderFeed: FC = () => {
  const { orders, total, totalToday } = useAppSelector(
    (store) => store.ordersFeedReducer
  );
  const dispatch = useAppDispatch();
  const ordersInfoRef = useRef<HTMLDivElement>(null);

  const ordersReady = getOrdersByKey(orders, "done", {
    extraClass: styles.orders_title_ready,
  });
  const ordersPending = getOrdersByKey(orders, "pending");

  useEffect(() => {
    dispatch(ordersWsConnect(WS_ALL_URL));
    return () => {
      dispatch(ordersWsDisconnect());
    };
  }, [dispatch]);

  return (
    <main
      className={clsx(styles.main_container, "flex column align-items_center ")}
    >
      <div>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className="flex row align-items_start gap-15">
          <Orders height={ordersInfoRef.current?.offsetHeight || 0} />
          <div ref={ordersInfoRef} className="flex column gap-15">
            <div className="flex row gap-9">
              <article className={styles.orders_container}>
                <h2 className="text text_type_main-default pb-6">Готовы:</h2>
                <div
                  className={clsx(
                    styles.orders_numbers,
                    "flex column wrap gap-2 text text_type_digits-default"
                  )}
                >
                  {ordersReady}
                </div>
              </article>
              <article className={styles.orders_container}>
                <h2 className="text text_type_main-default pb-6">В работе:</h2>
                <div
                  className={clsx(
                    styles.orders_numbers,
                    "flex column wrap gap-2 text text_type_digits-default"
                  )}
                >
                  {ordersPending}
                </div>
              </article>
            </div>
            <article>
              <h2 className="text text_type_main-default">
                Выполнено за все время:
              </h2>
              <div className="text text_type_digits-large">{total}</div>
            </article>
            <article>
              <h2 className="text text_type_main-default">
                Выполнено за сегодня:
              </h2>
              <div className="text text_type_digits-large">{totalToday}</div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
};
