import { clsx } from "clsx";
import { Link, Outlet, useMatch } from "react-router-dom";
import { useAppDispatch } from "../../hooks/use-store";
import { fetchLogout } from "../../services/actions/auth-actions";
import styles from "./styles.module.css";

export const Profile = () => {
  const isProfile = !!useMatch({ path: "/profile" });
  const isOrders = !!useMatch({ path: "/profile/orders" });
  const dispatch = useAppDispatch();

  const exit = () => {
    dispatch(fetchLogout());
  };

  const linkClass = clsx(
    styles.link,
    "text text_type_main-medium text_color_inactive",
    "flex row align-items_center justify-items_start"
  );

  const linkStyle = (isActive: boolean) =>
    isActive ? { color: "white" } : undefined;

  return (
    <div className="flex row">
      <nav className={clsx(styles.nav, "flex column align-items_end")}>
        <div className={clsx(styles.nav_container, "mt-20")}>
          <ul className={styles.list}>
            <li>
              <Link className={linkClass} style={linkStyle(isProfile)} to="">
                Профиль
              </Link>
            </li>
            <li>
              <Link
                className={linkClass}
                style={linkStyle(isOrders)}
                to="orders"
              >
                История заказов
              </Link>
            </li>
            <li>
              <div className={linkClass} onClick={exit}>
                Выход
              </div>
            </li>
          </ul>
          <div className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </div>
        </div>
      </nav>

      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
