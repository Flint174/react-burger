import styles from "./styles.module.css";
import { clsx } from "clsx";
import { NavLink } from "react-router-dom";
import { FC } from "react";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

interface HeaderLinkProps {
  text: string;
  icon: FC<TIconProps>;
  href: string;
}

export const HeaderLink: FC<HeaderLinkProps> = ({ text, icon, href }) => {
  return (
    <NavLink className={clsx(styles.link, "m-5 flex row")} to={href}>
      {({ isActive }) => (
        <>
          {icon({ type: isActive ? "primary" : "secondary" })}
          <p
            className={clsx(
              "text text_type_main-default ml-2",
              {
                text_color_inactive: !isActive,
              },
              styles.p
            )}
          >
            {text}
          </p>
        </>
      )}
    </NavLink>
  );
};
