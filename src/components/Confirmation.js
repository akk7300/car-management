import React from "react";

export const Confirmation = ({ onConfirm, onCancel }) => (
  <>
    <div className="modal-body">Are you sure you want to delete this car?</div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
      <button type="button" className="btn btn-danger" onClick={onConfirm}>
        Delete
      </button>
    </div>
  </>
);
