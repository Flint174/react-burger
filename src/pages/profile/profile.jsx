import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import { useDispatch } from "react-redux";
import { Link, Outlet, useMatch } from "react-router-dom";
import { fetchLogout } from "../../services/actions/auth-actions";
import styles from "./styles.module.css";

export const Profile = () => {
  const isProfile = !!useMatch({ path: "/profile", exact: true });
  const isOrders = !!useMatch({ path: "/profile/orders" });
  const dispatch = useDispatch();

  const exit = () => {
    dispatch(fetchLogout());
  };

  const linkClass = clsx(
    styles.link,
    "text text_type_main-medium text_color_inactive",
    "flex row align-items_center justify-items_start"
  );

  const linkStyle = (isActive) => (isActive ? { color: "white" } : undefined);

  return (
    <main
      className={clsx(styles.container, "flex row align-items_start gap-15")}
    >
      <nav className={styles.column_left}>
        <ul className={styles.list}>
          <li>
            <Link className={linkClass} style={linkStyle(isProfile)} to="">
              Профиль
            </Link>
          </li>
          <li>
            <Link className={linkClass} style={linkStyle(isOrders)} to="orders">
              История заказов
            </Link>
          </li>
          <li>
            <div className={linkClass} to="/login" onClick={exit}>
              Выход
            </div>
          </li>
        </ul>
        <div className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </nav>

      <div className={styles.column_middle}>
        <Outlet />
      </div>

      <div className={styles.column_right} />
    </main>
  );
};
