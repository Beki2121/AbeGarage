// =======================================================================


import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ServiceList.css';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import { Modal,Button } from "react-bootstrap";

const ServiceList = () => {
    const { t } = useTranslation();
    const [newService, setNewService] = useState({ service_name: '', service_description: '' });
    const [services, setServices] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentServiceId, setCurrentServiceId] = useState(null);
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);
     const [showSuccessModal, setShowSuccessModal] = useState(false);
     const [successMessage, setSuccessMessage] = useState("");
     const [showErrorModal, setShowErrorModal] = useState(false);
     const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        fetch('http://localhost:3000/api/services')
            .then(res => res.json())
            .then(data => setServices(data.data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewService({ ...newService, [name]: value });
    };

    const handleDelete = () => {
        fetch(`http://localhost:3000/api/deleteservice/${serviceToDelete.service_id}`, { method: 'DELETE' })
            .then(() => setServices(services.filter(service => service.service_id !== id)))
            .catch(error => console.error('Error deleting service:', error));
            window.location.reload()
    };

    const handleEdit = (id) => {
        const serviceToEdit = services.find(service => service.service_id === id);
        setNewService({ 
            service_name: serviceToEdit.service_name, 
            service_description: serviceToEdit.service_description 
        });
        setCurrentServiceId(id);
        setIsEditing(true);
        navigate('/admin/services#update')
    };
   
    const handleSaveEdit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(
            `http://localhost:3000/api/service-update/${currentServiceId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newService),
            }
          );

          console.log("one");

          if (!response.ok) throw new Error("Network response was not ok");
          console.log("two");

          const updatedService = await response.json();
          console.log("three");

          setServices(
            services.map((service) =>
              service.service_id === currentServiceId ? updatedService : service
            )
          );
          console.log("four");

          setNewService({ service_name: "", service_description: "" });
          setIsEditing(false);
          setCurrentServiceId(null);
          setShowSuccessModal(true);
          setSuccessMessage(t('Service updated successfully'));

          setTimeout(() => {
            window.location.reload();
          }, 2000); // 2 seconds delay
        } catch (error) {
            // alert("Something went wrong");
            setShowErrorModal(true);
            setErrorMessage(t('Error updating service'));
            console.error('Error updating service:', error);
        }
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:3000/api/service", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newService),
          });

          if (!response.ok) throw new Error("Network response was not ok");

          const service = await response.json();
          setServices([...services, service]);
          setNewService({ service_name: "", service_description: "" });
          setShowSuccessModal(true);
          setSuccessMessage(t('Service added successfully'));

          setTimeout(() => {
            window.location.reload();
          }, 2000); // 2 seconds delay
        } catch (error) {
         
            setShowErrorModal(true);
            setErrorMessage(t('Error adding service'));
            console.error('Error adding service:', error);
        }
    };


    const handleShowDeleteModal = (service) => {
        setServiceToDelete(service);
        setShowDeleteModal(true);
      };

    const handleCloseDeleteModal = () => {
        setServiceToDelete(null);
        setShowDeleteModal(false);
      };
// console.log(serviceToDelete)
     const handleCloseSuccessModal = () => {
       setShowSuccessModal(false);
     };

     const handleCloseErrorModal = () => {
       setShowErrorModal(false);
     };

    return (
      <>
        <div className="service-management">
          <div className="contact-section pad_1">
            <div className="contact-title mb-1">
              <h2 style={{ color: "#08194A" }}>{t('Services we provide')}</h2>
            </div>
          </div>

          <p className="description">
          {t('servicessec_intro')}
          </p>
          <div className="services-list">
            {services?.map((service) => (
              <div key={service.service_id} className="service-item py-4">
                <div className="service-details">
                  <h3 className="v_font" style={{ color: "#08194A" }}>
                    {service.service_name}
                  </h3>
                  <p>{service.service_description}</p>
                </div>
                <div className="service-actions">
                  <button onClick={() => handleEdit(service.service_id)}>
                    <a href="#update" style={{ color: "#ff6666" }}>
                      <FaEdit size={20} />
                    </a>
                  </button>
                  <button onClick={() => handleShowDeleteModal(service)}>
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            className="additional-requests"
            style={{ paddingBottom: "40px", marginTop: "20px" }}
            id="update"
          >
            <div
              className="contact-section pad_1"
              style={{ background: "#fff" }}
            >
              <div className="contact-title mb-1">
                <h2 style={{ fontSize: "32px" }}>
                  {!isEditing ? t('Add a new Service') : t('Update a Service')}
                </h2>
              </div>
            </div>

            <form onSubmit={!isEditing ? handleAddService : handleSaveEdit}>
              <div className="price">
                <input
                  type="text"
                  style={{ padding: "10px 15px" }}
                  placeholder={t('Service name')}
                  className="w-100"
                  name="service_name"
                  value={newService.service_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="serviceRequest">
                <input
                  type="text"
                  style={{ paddingLeft: "15px" }}
                  className="w-100"
                  name="service_description"
                  value={newService.service_description}
                  onChange={handleInputChange}
                  placeholder={t('Service Description')}
                  required
                />
              </div>

              {isEditing ? (
                <div className=" form-group col-md-12 d-flex gap-5 mt-3">
                  <button type="submit" className="theme-btn btn-style-one">
                    {t('Updated Service')}
                  </button>
                  <button
                    style={{ background: "#08194A" }}
                    className="theme-btn btn-style-one"
                    onClick={() => {
                      setIsEditing(false);
                      setNewService({
                        service_name: "",
                        service_description: "",
                      });
                    }}
                  >
                    {t('Cancel')}
                  </button>
                </div>
              ) : (
                <div className="form-group col-md-12">
                  <button className="theme-btn btn-style-one" type="submit">
                    {t('ADD SERVICE')}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t('Confirm Deletion')}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {t('Are you sure you want to delete')}{" "}
            <strong>
              {serviceToDelete ? `${serviceToDelete.service_name} ` : ""}
            </strong>
            ?
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              {t('Cancel')}
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              {t('Delete')}
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showSuccessModal}
          onHide={handleCloseSuccessModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{t('Success')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{successMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccessModal}>
              {t('OK')}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showErrorModal} onHide={handleCloseErrorModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t('Error')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{errorMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseErrorModal}>
              {t('OK')}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};

export default ServiceList;
