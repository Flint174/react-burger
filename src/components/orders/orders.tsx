import { FC } from "react";
import { OrderCard } from "./order-card";

export const Orders: FC = () => {
  return (
    <section>
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </section>
  );
};
