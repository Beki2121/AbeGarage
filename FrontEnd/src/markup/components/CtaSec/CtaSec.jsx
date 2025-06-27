import React from "react";
import { useTranslation } from "react-i18next";

const CtaSec = () => {
  const { t } = useTranslation();
  return (
    <section className="cta-section" style={{ background: "#1a237e" }}>
      <div className="auto-container">
        <div
          className="wrapper-box"
          style={{
            background: "#1A237E",
            color: "#fff",
            borderRadius: 8,
            padding: "2.5rem 0",
          }}
        >
          <div className="left-column">
            <h3>{t("Schedule Your Appointment Today")}</h3>
            <div className="text">{t("ctasec_text")}</div>
          </div>
          <div className="right-column">
            <div className="phone">1800.456.7890</div>
            <div className="btn">
              <a href="/contact" className="theme-btn btn-style-one">
                <span>{t("Contact Us")}</span>
                <i className="flaticon-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSec;
