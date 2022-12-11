import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import { clsx } from "clsx";
import { FC, ReactElement } from "react";

interface CompositionListItemProps {
  isLocked?: boolean;
  children?: ReactElement;
}

export const CompositionListItem: FC<CompositionListItemProps> = ({
  isLocked = false,
  children,
}) => {
  return (
    <div className="flex row align-items_center">
      <div className={clsx(isLocked && styles.composition_list_item_invisible)}>
        <DragIcon type="primary" />
      </div>
      <div className={clsx(styles.composition_list_item_children, "ml-2")}>
        {children}
      </div>
    </div>
  );
};
