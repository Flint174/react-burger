import { FC, useEffect } from "react";
import { Orders } from "../../components/orders/orders";
import { useAppDispatch } from "../../hooks/use-store";
import {
  ordersWsConnect,
  ordersWsDisconnect,
} from "../../services/actions/orders-ws-actions";
import { WS_ALL_URL } from "../../utils/constants";

export const OrderFeed: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ordersWsConnect(WS_ALL_URL));
    return () => {
      dispatch(ordersWsDisconnect());
    };
  }, [dispatch]);

  return (
    <main>
      <h1>Лента заказов</h1>
      <div className="flex row gap-15">
        <Orders height={500} />
        <div>right side</div>
      </div>
    </main>
  );
};
