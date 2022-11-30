import { clsx } from "clsx";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { fetchLogout } from "../../services/actions/auth-actions";
import styles from "./styles.module.css";

export const Profile = () => {
  const dispatch = useDispatch();

  const exit = () => {
    dispatch(fetchLogout());
  };

  const navLinkClass = clsx(
    styles.link,
    "text text_type_main-medium text_color_inactive",
    "flex row align-items_center justify-items_start"
  );

  const navLinkStyle = ({ isActive }) =>
    isActive ? { color: "white" } : undefined;

  // TODO: заменить NavLink на Link и разобраться с их активным статусом
  return (
    <main
      className={clsx(styles.container, "flex row align-items_start gap-15")}
    >
      <nav className={styles.column}>
        <ul className={styles.list}>
          <li>
            <NavLink className={navLinkClass} style={navLinkStyle} to="">
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink className={navLinkClass} style={navLinkStyle} to="orders">
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink
              className={navLinkClass}
              style={navLinkStyle}
              to="/"
              onClick={exit}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <div className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </nav>

      <div className={styles.column}>
        <Outlet />
      </div>

      <div className={styles.column} />
    </main>
  );
};
