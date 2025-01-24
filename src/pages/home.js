import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../constants/config";
import { Table } from "../components/Table";
import { Form } from "../components/Form";
import { Modal } from "../components/Modal";
import { Confirmation } from "../components/Confirmation";
import { Pagination } from "../components/Pagination";
import { SearchBox } from "../components/SearchBox";

export const Home = () => {
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    registrationNumber: "",
    brand: "",
    model: "",
    notes: "",
  });

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}?page=${page}${search ? `&search=${search}` : ""}`
      );
      setCars(response.data.data);
      setMeta(response.data.meta);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch cars");
    }
  }, [page, search]); 

  useEffect(() => {
    const debounced = setTimeout(() => {
      fetchCars();
    }, 300);
    return () => clearTimeout(debounced);
  }, [fetchCars]);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCar) {
        await axios.put(`${API_URL}/${selectedCar.id}`, formData);
        toast.success("Car updated successfully");
      } else {
        await axios.post(API_URL, formData);
        toast.success("Car added successfully");
      }
      fetchCars();
      handleCloseModal();
    } catch (error) {
      if (error.response?.data?.errors) {
        const newErrors = {};
        error.response.data.errors.forEach((err) => {
          newErrors[err.field] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteId}`);
      toast.success("Car deleted successfully");
      fetchCars();
    } catch (error) {
      toast.error("Failed to delete car");
    }
    setShowDeleteModal(false);
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setFormData({
      id: car.id,
      registrationNumber: car.registrationNumber,
      brand: car.brand,
      model: car.model,
      notes: car.notes || "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCar(null);
    setFormData({
      registrationNumber: "",
      brand: "",
      model: "",
      notes: "",
    });
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
      <Pagination meta={meta} onPageChange={handlePageChange} />

      <Modal
        show={showModal}
        title={selectedCar ? "Edit Car" : "Add New Car"}
        onClose={handleCloseModal}
      >
        <Form
          formData={formData}
          errors={errors}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          onClose={handleCloseModal}
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
