import React, { useState, useEffect } from "react";
import "./ServiceList.css";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {
  FaOilCan,
  FaCarBattery,
  FaTools,
  FaCarCrash,
  FaTachometerAlt,
  FaCarSide,
  FaFan,
  FaBolt,
  FaAlignCenter,
  FaSnowflake,
  FaWind,
  FaLightbulb,
  FaGasPump,
  FaCogs,
  FaDoorOpen,
  FaWindowRestore,
  FaBrush,
  FaWrench,
  FaBelt,
  FaLock,
  FaWindowMaximize,
  FaBatteryFull,
  FaTruck,
  FaBus,
  FaTrailer,
  FaDownload,
} from "react-icons/fa";

const ServiceList = () => {
  const [newService, setNewService] = useState({
    service_name: "",
    service_description: "",
  });
  const [services, setServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data.data.rows))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/deleteservice/${id}`, { method: "DELETE" })
      .then(() =>
        setServices(services.filter((service) => service.service_id !== id))
      )
      .catch((error) => console.error("Error deleting service:", error));
  };

  const handleEdit = (id) => {
    const serviceToEdit = services.find((service) => service.service_id === id);
    setNewService({
      service_name: serviceToEdit.service_name,
      service_description: serviceToEdit.service_description,
    });
    setCurrentServiceId(id);
    setIsEditing(true);
    // window.location.reload();

    // setTimeout(()=> {
    //     window.location.reload();
    //  }, 3001)
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/service/${currentServiceId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newService),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const updatedService = await response.json();
      setServices(
        services.map((service) =>
          service.service_id === currentServiceId ? updatedService : service
        )
      );
      setNewService({ service_name: "", service_description: "" });
      setIsEditing(false);
      setCurrentServiceId(null);
      alert("Service updated successfully");
    } catch (error) {
      alert("Something went wrong");
      console.error("Error updating service:", error);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const service = await response.json();
      setServices([...services, service]);
      setNewService({ service_name: "", service_description: "" });
      alert("Service added successfully");
    } catch (error) {
      alert("Something went wrong");
      console.error("Error adding service:", error);
    }
  };

  // Map service titles to icons with better visibility
  const getServiceIcon = (title) => {
    const t = title.toLowerCase();

    // Oil and fluid related services
    if (t.includes("oil")) return <FaOilCan size={44} color="#1a237e" />;
    if (t.includes("coolant")) return <FaSnowflake size={44} color="#1a237e" />;
    if (t.includes("transmission")) return <FaCogs size={44} color="#1a237e" />;
    if (t.includes("fuel")) return <FaGasPump size={44} color="#1a237e" />;

    // Battery and electrical
    if (t.includes("battery"))
      return <FaCarBattery size={44} color="#1a237e" />;
    if (t.includes("spark")) return <FaBolt size={44} color="#1a237e" />;
    if (t.includes("light")) return <FaLightbulb size={44} color="#1a237e" />;

    // Tires and wheels
    if (t.includes("tire") || t.includes("pneumatic"))
      return <FaCarSide size={44} color="#1a237e" />;
    if (t.includes("wheel") || t.includes("alignment"))
      return <FaAlignCenter size={44} color="#1a237e" />;

    // Brakes and suspension
    if (t.includes("brake")) return <FaCarCrash size={44} color="#1a237e" />;
    if (t.includes("shock") || t.includes("strut"))
      return <FaWrench size={44} color="#1a237e" />;

    // Engine and mechanical
    if (t.includes("engine")) return <FaCogs size={44} color="#1a237e" />;
    if (t.includes("timing")) return <FaBelt size={44} color="#1a237e" />;
    if (t.includes("serpentine")) return <FaBelt size={44} color="#1a237e" />;
    if (t.includes("radiator")) return <FaFan size={44} color="#1a237e" />;

    // Filters
    if (t.includes("filter")) return <FaWind size={44} color="#1a237e" />;

    // AC and climate
    if (t.includes("ac") || t.includes("air conditioning"))
      return <FaSnowflake size={44} color="#1a237e" />;

    // Exhaust
    if (t.includes("exhaust")) return <FaCarCrash size={44} color="#1a237e" />;

    // Power steering
    if (t.includes("power steering"))
      return <FaCogs size={44} color="#1a237e" />;

    // Wiper and glass
    if (t.includes("wiper"))
      return <FaWindowRestore size={44} color="#1a237e" />;
    if (t.includes("window"))
      return <FaWindowMaximize size={44} color="#1a237e" />;

    // Locks and security
    if (t.includes("lock")) return <FaLock size={44} color="#1a237e" />;
    if (t.includes("door")) return <FaDoorOpen size={44} color="#1a237e" />;

    // Cleaning and maintenance
    if (t.includes("cleaning")) return <FaBrush size={44} color="#1a237e" />;
    if (t.includes("restoration")) return <FaBrush size={44} color="#1a237e" />;

    // Tachograph (Italian services)
    if (t.includes("tachigrafo"))
      return <FaTachometerAlt size={44} color="#1a237e" />;
    if (t.includes("scarico")) return <FaDownload size={44} color="#1a237e" />;
    if (t.includes("rimorchi")) return <FaTrailer size={44} color="#1a237e" />;
    if (t.includes("veicoli industriali"))
      return <FaTruck size={44} color="#1a237e" />;
    if (t.includes("bus")) return <FaBus size={44} color="#1a237e" />;

    // Default fallback
    return <FaTools size={44} color="#1a237e" />;
  };

  return (
    <div className="main-service-management">
      <div className="main-service-provide">
        <h1>Services we provide</h1>
      </div>

      <p className="main-description">
        Bring to the table win-win survival strategies to ensure proactive
        domination. At the end of the day, going forward, a new normal that has
        evolved from generation X is on the runway heading towards a streamlined
        cloud solution.
      </p>
      <div className="main-services-list">
        {services?.map((service) => (
          <div key={service.service_id} className="main-service-item">
            <div
              className="main-service-details"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div className="main-service-icon-area">
                {getServiceIcon(service.service_name)}
              </div>
              <h3 style={{ textAlign: "center" }}>{service.service_name}</h3>
              <p style={{ textAlign: "center" }}>
                {service.service_description}
              </p>
            </div>
            <div className="main-service-actions">
              <button onClick={() => handleEdit(service.service_id)}>
                <CiEdit size={28} />
              </button>
              <button onClick={() => handleDelete(service.service_id)}>
                <MdDelete size={28} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {isEditing && (
        <section className="main-add-new-service-container">
          <div className="main-add-new-service">
            <h2>Update service</h2>
          </div>
          <div className="main-add-service-form">
            <form onSubmit={handleSaveEdit}>
              <input
                type="text"
                name="service_name"
                value={newService.service_name}
                onChange={handleInputChange}
                placeholder="Service Name"
                required
              />
              <textarea
                type="text"
                name="service_description"
                value={newService.service_description}
                onChange={handleInputChange}
                placeholder="Service Description"
                required
              />
              <button type="submit">Updated Service</button>
            </form>
          </div>
        </section>
      )}
      {!isEditing && (
        <section className="main-add-new-service-container">
          <div className="main-add-new-service">
            <h2>Add a new service</h2>
          </div>
          <div className="main-add-service-form">
            <form onSubmit={handleAddService}>
              <input
                type="text"
                name="service_name"
                value={newService.service_name}
                onChange={handleInputChange}
                placeholder="Service Name"
                required
              />
              <textarea
                type="text"
                name="service_description"
                value={newService.service_description}
                onChange={handleInputChange}
                placeholder="Service Description"
                required
              />
              <button type="submit">Add Service</button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServiceList;
