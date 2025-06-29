import React from "react";
import { useTranslation } from "react-i18next";
import PhoneIcon from "@mui/icons-material/Phone";

const CtaSec = () => {
  const { t } = useTranslation();
  return (
    <section className="cta-section" style={{ background: "#1a237e" }}>
      <div className="auto-container">
        <div
          className="wrapper-box"
          style={{
            background: "#ff9800",
            color: "#fff",
            borderRadius: 8,
            padding: "2.5rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "nowrap",
          }}
        >
          <div
            className="left-column"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minWidth: 0,
            }}
          >
            <h3
              style={{ marginBottom: 0, whiteSpace: "nowrap", paddingLeft: 30 }}
            >
              {t("Schedule Your Appointment Today")}
            </h3>
            <div className="text" style={{ paddingLeft: 30 }}>
              {t("ctasec_text")}
            </div>
          </div>
          <div
            className="right-column"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              minWidth: 0,
            }}
          >
            <div
              className="phone"
              style={{ display: "flex", alignItems: "center", marginRight: 24 }}
            >
              <a
                href="tel:+390461996222"
                style={{
                  color: "#fff !important",
                  textDecoration: "none",
                  fontWeight: 649,
                  fontSize: 33,
                  letterSpacing: 2,
                  WebkitTextFillColor: "#fff",
                  MozTextFillColor: "#fff",
                }}
              >
                +39 0461 996222
              </a>
            </div>
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
