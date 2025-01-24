import React from "react";

export const Modal = ({ show, title, onClose, children }) => (
  <>
    <div
      className={`modal ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          {children}
        </div>
      </div>
    </div>
    {show && <div className="modal-backdrop show"></div>}
  </>
);
