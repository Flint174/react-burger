import PropTypes from "prop-types";
import styles from "./styles.module.css";

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
