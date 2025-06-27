import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import vehicleService from "../../../../services/vehicle.service";
import FormInput from "../../../../components/common/FormInput";
import SubmitButton from "../../../../components/common/SubmitButton";
import ValidationError from "../../../../components/common/ValidationError";
import { validateRequired } from "../../../../components/common/validation";

function EditVehicleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();
  const token = employee?.employee_token;

  const [vehicle_year, setVehicleYear] = useState("");
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");
  const [customer_id, setCustomerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // Validation states
  const [yearError, setYearError] = useState("");
  const [makeError, setMakeError] = useState("");
  const [modelError, setModelError] = useState("");
  const [tagError, setTagError] = useState("");
  const [serialError, setSerialError] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await vehicleService.getVehicleById(id, token);
        setVehicleYear(data.vehicle_year);
        setVehicleMake(data.vehicle_make);
        setVehicleModel(data.vehicle_model);
        setVehicleType(data.vehicle_type);
        setVehicleMileage(data.vehicle_mileage);
        setVehicleTag(data.vehicle_tag);
        setVehicleSerial(data.vehicle_serial);
        setVehicleColor(data.vehicle_color);
        setCustomerId(data.customer_id);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
        setServerError("Failed to fetch vehicle data");
      }
    };

    if (id && token) {
      fetchVehicle();
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    let valid = true;
    const yearErr = validateRequired(vehicle_year, "Vehicle year");
    setYearError(yearErr);
    if (yearErr) valid = false;

    const makeErr = validateRequired(vehicle_make, "Vehicle make");
    setMakeError(makeErr);
    if (makeErr) valid = false;

    const modelErr = validateRequired(vehicle_model, "Vehicle model");
    setModelError(modelErr);
    if (modelErr) valid = false;

    const tagErr = validateRequired(vehicle_tag, "Vehicle tag");
    setTagError(tagErr);
    if (tagErr) valid = false;

    const serialErr = validateRequired(vehicle_serial, "Vehicle serial");
    setSerialError(serialErr);
    if (serialErr) valid = false;

    if (!valid) {
      setLoading(false);
      return;
    }

    const vehicleData = {
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
      customer_id,
    };

    try {
      const data = await vehicleService.updateVehicle(id, vehicleData, token);
      console.log(data);
      // Handle success - redirect or show success message
      navigate("/admin/vehicles");
    } catch (error) {
      console.error("Error updating vehicle:", error);
      setServerError(error?.response?.data?.msg || "Failed to update vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit Vehicle</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <ValidationError error={serverError} />
                    <FormInput
                      type="number"
                      name="vehicle_year"
                      value={vehicle_year}
                      onChange={(e) => setVehicleYear(e.target.value)}
                      placeholder="Vehicle year"
                      error={yearError}
                    />
                    <FormInput
                      type="text"
                      name="vehicle_make"
                      value={vehicle_make}
                      onChange={(e) => setVehicleMake(e.target.value)}
                      placeholder="Vehicle make"
                      error={makeError}
                    />
                    <FormInput
                      type="text"
                      name="vehicle_model"
                      value={vehicle_model}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      placeholder="Vehicle model"
                      error={modelError}
                    />
                    <FormInput
                      type="text"
                      name="vehicle_type"
                      value={vehicle_type}
                      onChange={(e) => setVehicleType(e.target.value)}
                      placeholder="Vehicle type"
                    />
                    <FormInput
                      type="number"
                      name="vehicle_mileage"
                      value={vehicle_mileage}
                      onChange={(e) => setVehicleMileage(e.target.value)}
                      placeholder="Vehicle mileage"
                    />
                    <FormInput
                      type="text"
                      name="vehicle_tag"
                      value={vehicle_tag}
                      onChange={(e) => setVehicleTag(e.target.value)}
                      placeholder="Vehicle tag"
                      error={tagError}
                    />
                    <FormInput
                      type="text"
                      name="vehicle_serial"
                      value={vehicle_serial}
                      onChange={(e) => setVehicleSerial(e.target.value)}
                      placeholder="Vehicle serial number"
                      error={serialError}
                    />
                    <FormInput
                      type="text"
                      name="vehicle_color"
                      value={vehicle_color}
                      onChange={(e) => setVehicleColor(e.target.value)}
                      placeholder="Vehicle color"
                    />
                    <FormInput
                      type="number"
                      name="customer_id"
                      value={customer_id}
                      onChange={(e) => setCustomerId(e.target.value)}
                      placeholder="Customer ID"
                    />
                    <div className="form-group col-md-12">
                      <SubmitButton loading={loading}>
                        Update Vehicle
                      </SubmitButton>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditVehicleForm;
