import { FC } from "react";
import { OrderCard } from "./order-card";

import { fakeOrders } from "../../utils/fakeOrders";

export const Orders: FC = () => {
  return (
    <section>
      {fakeOrders.orders.map((order) => (
        <OrderCard order={order} key={order.number} />
      ))}
    </section>
  );
};
