import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { carActions } from '../redux/slices/carSlice';

export const Form = ({ formData, errors, onSubmit, onChange, onClose }) => {
  const dispatch = useDispatch();
  const { carModels, loadingCarModels } = useSelector(state => ({
    carModels: state.car.carModels,
    loadingCarModels: state.car.loadingCarModels
  }));

  useEffect(() => {
    dispatch(carActions.fetchCarModelsRequest());
  }, [dispatch]);

  if (loadingCarModels) {
    return <div className="modal-body">Loading...</div>;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="modal-body">
        <div className="mb-3">
          <label className="form-label">Registration Number</label>
          <input
            type="text"
            className={`form-control ${errors.registrationNumber ? "is-invalid" : ""}`}
            value={formData.registrationNumber}
            onChange={(e) => onChange("registrationNumber", e.target.value)}
            placeholder="Enter registration number"
          />
          {errors.registrationNumber && (
            <div className="invalid-feedback">{errors.registrationNumber}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Brand</label>
          <select
            className={`form-select ${errors.brand ? "is-invalid" : ""}`}
            value={formData.brand}
            onChange={(e) => {
              onChange("brand", e.target.value);
              onChange("model", "");
            }}
          >
            <option value="">Select Brand</option>
            {Object.keys(carModels).map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          {errors.brand && <div className="invalid-feedback">{errors.brand}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Model</label>
          <select
            className={`form-select ${errors.model ? "is-invalid" : ""}`}
            value={formData.model}
            onChange={(e) => onChange("model", e.target.value)}
            disabled={!formData.brand}
          >
            <option value="">Select Model</option>
            {formData.brand &&
              carModels[formData.brand]?.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>
          {errors.model && <div className="invalid-feedback">{errors.model}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            className={`form-control ${errors.notes ? "is-invalid" : ""}`}
            value={formData.notes || ""}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Enter notes"
            rows="3"
          />
          {errors.notes && <div className="invalid-feedback">{errors.notes}</div>}
        </div>
      </div>

      <div className="modal-footer border-0">
        <button type="button" className="btn btn-light" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {formData.id ? "Update" : "Add"} Car
        </button>
      </div>
    </form>
  );
};