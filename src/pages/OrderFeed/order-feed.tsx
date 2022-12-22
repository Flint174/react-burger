import { FC } from "react";
import { Orders } from "../../components/orders/orders";

export const OrderFeed: FC = () => {
  return (
    <main>
      <h1>Лента заказов</h1>
      <div className="flex row gap-15">
        <Orders />
        <div>right side</div>
      </div>
    </main>
  );
};
