import styles from "./styles.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay";
import { FC, ReactElement, useEffect } from "react";
import { clsx } from "clsx";

interface ModalProps {
  onClose?: () => void;
  children?: ReactElement;
}

export const Modal: FC<ModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    const onKeyDown: (event: KeyboardEvent) => void = (e) => {
      if (e.key === "Escape") {
        onClose && onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <div className={clsx(styles.container, { [styles.modal]: !!onClose })}>
        {onClose && (
          <div className={styles.modal_card_close}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        )}
        <div className="flex column align-items_center justify-content_center">
          {children}
        </div>
      </div>

      {onClose && <ModalOverlay onClose={onClose} />}
    </>
  );
};
