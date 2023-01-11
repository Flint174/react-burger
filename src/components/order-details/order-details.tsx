import clsx from "clsx";
import { FC, useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/use-store";
import { fetchOrderGet } from "../../services/actions/order-actions";
import { clearOrder } from "../../services/slices/order-slice";
import { orderStatus } from "../../utils/orderStatus";
import styles from "./styles.module.css";

interface OrderDetailsProps {
  isModal?: boolean;
}

export const OrderDetails: FC<OrderDetailsProps> = ({ isModal = false }) => {
  const { number } = useParams();
  const { order } = useAppSelector((store) => store.orderReducer);
  const dispatch = useAppDispatch();
  const status = orderStatus(order?.status || "");

  useEffect(() => {
    dispatch(fetchOrderGet(number || ""));
    return () => {
      dispatch(clearOrder());
    };
  }, [dispatch, number]);

  return (
    <section className={clsx(styles.container, "m-10")}>
      <div
        className={clsx(
          styles.title_container,
          "flex row align-items_center mt-10 ml-10 mr-10",
          { "justify-content_center": !isModal }
        )}
      >
        <div className="text text_type_digits-default">
          #{`000000${order?.number ?? ""}`.slice(-6)}
        </div>
      </div>
      <h1 className="text text_type_main-medium mt-5">{order?.name}</h1>
      <div>{status}</div>
    </section>
  );
};
