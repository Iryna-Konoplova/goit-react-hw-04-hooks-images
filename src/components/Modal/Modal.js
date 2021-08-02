// Модули
// import React, { Component } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

// Стили
import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({children, onClose}) {
  const  handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

      return createPortal(
      <div className={styles.Overlay} onClick={handleBackdropClick}>
        <div className={styles.Modal}>{children}</div>
      </div>,
      modalRoot,
    );
}


Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={styles.Overlay} onClick={this.handleBackdropClick}>
//         <div className={styles.Modal}>{this.props.children}</div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

// Modal.propTypes = {
//   children: PropTypes.node.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default Modal;
