import { Composition } from "./composition";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import { OrderDetail } from "../order-details";
import { useMemo } from "react";
import styles from "./styles.module.css";
import { Modal } from "../modal";
import { fetchOrder } from "../../services/actions/order-actions";
import { clearOrder } from "../../services/slices/order-slice";
import { clearConstructor } from "../../services/slices/constructor-slice";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/use-store";

export const BurgerConstructor = () => {
  const { bun, ingredients } = useAppSelector(
    (store) => store.constructorReducer
  );

  const { orderNumber, loading } = useAppSelector(
    (store) => store.orderReducer
  );
  const { user } = useAppSelector((store) => store.authReducer);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const total = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (acc, value) => acc + value.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  function closeOrderDetails() {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  }

  const getOrderDedails = () => {
    if (!bun) return;
    const ingredientsIds = [
      bun._id,
      ...ingredients.map((el) => el._id),
      bun._id,
    ];
    if (user) {
      dispatch(fetchOrder({ ingredients: ingredientsIds }));
    } else {
      navigate("/login");
    }
  };

  const disableButton = useMemo(
    () => !bun || !ingredients.length || orderNumber || loading,
    [bun, ingredients, orderNumber, loading]
  );

  return (
    <section className={clsx("flex column", styles.container)}>
      <Composition />
      <div className="mt-10 flex row align-items_center align-self_end">
        <p className="text text_type_digits-medium mr-2">{total}</p>
        <CurrencyIcon type="primary" />
        <Button
          disabled={!!disableButton}
          htmlType="button"
          extraClass="ml-10"
          onClick={getOrderDedails}
        >
          ОФОРМИТЬ ЗАКАЗ
        </Button>
      </div>
      {orderNumber && (
        <Modal onClose={closeOrderDetails}>
          <OrderDetail orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
};
