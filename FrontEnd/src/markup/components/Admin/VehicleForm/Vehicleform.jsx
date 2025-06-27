import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../../../../Context/AuthContext";
import vehicleService from "../../../../services/vehicle.service";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import FormInput from "../../../../components/common/FormInput";
import SubmitButton from "../../../../components/common/SubmitButton";
import ValidationError from "../../../../components/common/ValidationError";
import { validateRequired } from "../../../../components/common/validation";

const Vehicleform = ({ id, v }) => {
  const { addvehicle, setVehicle } = v;

  const customer_id = id;

  const [serverError, setServerError] = useState("");
  const { employee } = useAuth();
  const [vehicle_year, setVehicleYear] = useState("");
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");
  const [spin, setSpinner] = useState(false);
  const navigate = useNavigate();
  // console.log(employee,employee?.employee_token)

  const token = employee?.employee_token;

  // Validation states
  const [yearError, setYearError] = useState("");
  const [makeError, setMakeError] = useState("");
  const [modelError, setModelError] = useState("");
  const [tagError, setTagError] = useState("");
  const [serialError, setSerialError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

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
      setSpinner(false);
      return;
    }

    const formData = {
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    };

    try {
      const result = await vehicleService.AddVehicle(formData, token);

      // console.log(result)
      setTimeout(() => {
        setSpinner(false);
        navigate("/admin/create-order");
      }, 1000);
    } catch (error) {
      console.log(error);
      setServerError(error?.response?.data?.msg || "Failed to create vehicle");
      setSpinner(false);
    }
  };

  return (
    <section className="contact-section row pad">
      <div className="auto-container col-md-8 bgc ">
        <div className="close-btn" onClick={() => setVehicle(!addvehicle)}>
          <IoCloseSharp
            color="#fff"
            style={{
              background: "red",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        </div>

        <div className="contact-title ">
          <h2>Add a new Vehicle</h2>
        </div>

        <div className="row clearfix">
          <div className="form-column ">
            <div className="inner-column ">
              <div className="contact-form  col-lg-10 ">
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
                      placeholder="Vehicle serial"
                      error={serialError}
                    />
                    <FormInput
                      type="text"
                      name="vehicle_color"
                      value={vehicle_color}
                      onChange={(e) => setVehicleColor(e.target.value)}
                      placeholder="Vehicle color"
                    />
                    <div className="form-group col-md-12">
                      <SubmitButton loading={spin}>
                        {spin ? (
                          <BeatLoader color="white" size={8} />
                        ) : (
                          "ADD VEHICLE"
                        )}
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
};

export default Vehicleform;
