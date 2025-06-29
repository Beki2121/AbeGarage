import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const ContactForm = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      user_name: formData.get("user_name"),
      user_email: formData.get("user_email"),
      message: formData.get("message"),
    };
    try {
      await axios.post("http://localhost:3000/api/contact", data);
      setMessage(t("Your message is sent successfully!"));
      setMessageType("success");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      setMessage(t("Failed to send your message. Please try again."));
      setMessageType("error");
    }
  };

  return (
    // <form ref={form} onSubmit={sendEmail}>
    //   <label>Name</label>
    //   <input type="text" name="user_name" />
    //   <label>Email</label>
    //   <input type="email" name="user_email" />
    //   <label>Message</label>
    //   <textarea name="message" />
    //   <input type="submit" value="Send" />
    // </form>

    <div className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>{t("Contact us")}</h2>
        </div>

        <div className="row clearfix">
          <div className="form-column col-lg">
            <div className="inner-column">
              <div className="contact-form">
                {message && (
                  <div
                    className={`alert ${
                      messageType === "success"
                        ? "alert-success"
                        : "alert-danger"
                    }`}
                  >
                    {message}
                  </div>
                )}
                <form ref={form} onSubmit={sendEmail}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="user_name"
                        placeholder={t("Name")}
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        name="user_email"
                        placeholder={t("Your Email")}
                      />
                    </div>

                    <div className="form-group col-md-12 contact_us">
                      <textarea
                        type="text"
                        name="message"
                        placeholder={t("Your message")}
                      />
                    </div>

                    <div className="form-group col-md-12">
                      {/* <input type="submit" value="Send" className='theme-btn btn-style-one' />
                                                <span>Login</span> */}
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text={t("Please wait...")}
                      >
                        <span>{t("SEND")}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
