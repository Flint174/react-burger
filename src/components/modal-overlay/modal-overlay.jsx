import PropTypes from "prop-types";
import styles from "./style.module.css";

export const ModalOverlay = ({ onClose, children }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
