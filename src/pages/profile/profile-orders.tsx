import { FC, useEffect } from "react";
import { Orders } from "../../components/orders/orders";
import { useAppDispatch } from "../../hooks/use-store";
import {
  ordersWsConnect,
  ordersWsDisconnect,
} from "../../services/actions/orders-ws-actions";
import { ACCESS_TOKEN, WS_BASE_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const bearer = "Bearer ";
    const token = getCookie(ACCESS_TOKEN) || "";
    const url = `${WS_BASE_URL}?token=${
      token.startsWith(bearer) ? token.slice(bearer.length) : token
    }`;

    dispatch(ordersWsConnect(url));

    return () => {
      dispatch(ordersWsDisconnect());
    };
  }, [dispatch]);

  return (
    <main className="pt-4 pl-15">
      <Orders showStatus={true} height={500} />
    </main>
  );
};
