import styles from "./styles.module.css";
import { clsx } from "clsx";
import { FC } from "react";

interface InfoFieldProps {
  name: string;
  value: number;
}

export const InfoField: FC<InfoFieldProps> = ({ name, value }) => {
  return (
    <div
      className={clsx(styles.container, "flex column align-items_center gap-2")}
    >
      <div className="text text_type_main-default text_color_inactive">
        {name}
      </div>

      <div className="text text_type_digits-default text_color_inactive">
        {value}
      </div>
    </div>
  );
};
