import React, { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ 
  show, 
  onClose, 
  title, 
  children, 
  footer 
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          {footer || (
            <button className="modal-button" onClick={onClose}>Luk</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;