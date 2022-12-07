import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay";
import { useEffect } from "react";
import { clsx } from "clsx";

export const Modal = ({ title = "", onClose, children }) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
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
            <CloseIcon onClick={onClose} />
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

Modal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
};
