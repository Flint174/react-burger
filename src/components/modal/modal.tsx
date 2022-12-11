import styles from "./styles.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay";
import { FC, ReactElement, useEffect } from "react";
import { clsx } from "clsx";

interface ModalProps {
  title?: string;
  onClose?: () => void;
  children?: ReactElement;
}

export const Modal: FC<ModalProps> = ({ title = "", onClose, children }) => {
  useEffect(() => {
    const onKeyDown: (
      this: Document,
      event: globalThis.KeyboardEvent
    ) => void = (e) => {
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
        <div
          className={clsx(
            styles.title_container,
            "flex row align-items_center mt-10 ml-10 mr-10",
            { "justify-content_center": !onClose }
          )}
        >
          <h3 className="text text_type_main-large">{title}</h3>
        </div>
        <div className="flex column align-items_center justify-content_center">
          {children}
        </div>
      </div>

      {onClose && <ModalOverlay onClose={onClose} />}
    </>
  );
};
