import { useState } from "react";

const NotesModal = ({ show, note, onClose }) => (
  <div
    className={`modal ${show ? "show d-block" : "d-none"}`}
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Notes</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div className="modal-body">
          <p className="mb-0">{note}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const Table = ({ loading, cars, onEdit, onDelete }) => {
  const [selectedNote, setSelectedNote] = useState("");
  const [showModal, setShowModal] = useState(false);

  const truncateText = (text, maxLength = 25) => {
    if (!text || text.length <= maxLength) return text || "-";
    return (
      <>
        {text.slice(0, maxLength)}...
        <button
          className="btn btn-link text-primary p-0 ms-1"
          onClick={() => {
            setSelectedNote(text);
            setShowModal(true);
          }}
        >
          view more
        </button>
      </>
    );
  };

  return (
    <>
      <div className="card custom-card">
        <div className="table-responsive">
          <table className="table custom-table">
            <thead>
              <tr>
                <th>Registration Number</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(
                cars.map((car) => (
                  <tr key={car.id}>
                    <td>{car.registrationNumber}</td>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{truncateText(car.notes)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-icon"
                          onClick={() => onEdit(car)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-icon text-danger"
                          onClick={() => onDelete(car.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <NotesModal
        show={showModal}
        note={selectedNote}
        onClose={() => {
          setShowModal(false);
          setSelectedNote("");
        }}
      />
    </>
  );
};
