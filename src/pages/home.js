import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { carActions } from '../redux/slices/carSlice';
import { Table } from '../components/Table';
import { Form } from '../components/Form';
import { Modal } from '../components/Modal';
import { Confirmation } from '../components/Confirmation';
import { Pagination } from '../components/Pagination';
import { SearchBox } from '../components/SearchBox';

export const Home = () => {
  const dispatch = useDispatch();
  const { cars, loading, errors, meta, page, search } = useSelector(state => state.car);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  
  const [formData, setFormData] = useState({
    registrationNumber: '',
    brand: '',
    model: '',
    notes: ''
  });

  useEffect(() => {
    const debounced = setTimeout(() => {
      dispatch(carActions.fetchCarsRequest());
    }, 300);
    return () => clearTimeout(debounced);
  }, [dispatch, page, search]);

  useEffect(() => {
    if (!loading && Object.keys(errors).length === 0 && showModal) {
      handleCloseModal();
    }
  }, [loading, errors]);

  const handleSearch = (value) => {
    dispatch(carActions.setSearch(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCar) {
      dispatch(carActions.updateCarRequest({ ...formData, id: selectedCar.id }));
    } else {
      dispatch(carActions.addCarRequest(formData));
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(carActions.deleteCarRequest(deleteId));
    setShowDeleteModal(false);
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setFormData({
      id: car.id,
      registrationNumber: car.registrationNumber,
      brand: car.brand,
      model: car.model,
      notes: car.notes || ''
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCar(null);
    setFormData({
      registrationNumber: '',
      brand: '',
      model: '',
      notes: ''
    });
    dispatch(carActions.clearErrors());
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePageChange = (newPage) => {
    dispatch(carActions.setPage(newPage));
  };

  return (
    <div className="container-fluid p-4 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Car Management</h2>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add New Car
        </button>
      </div>

      <SearchBox onSearch={handleSearch} loading={loading} />

      <Table
        loading={loading}
        cars={cars}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <Pagination 
        meta={meta} 
        onPageChange={handlePageChange} 
      />

      <Modal
        show={showModal}
        title={selectedCar ? 'Edit Car' : 'Add New Car'}
        onClose={handleCloseModal}
      >
        <Form
          formData={formData}
          errors={errors}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          onClose={handleCloseModal}
          loading={loading}
        />
      </Modal>

      <Modal
        show={showDeleteModal}
        title="Confirm Delete"
        onClose={() => setShowDeleteModal(false)}
      >
        <Confirmation
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      </Modal>
    </div>
  );
};
