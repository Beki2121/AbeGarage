import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import eurodieselLogo from "../../../../public/eurodiesel-logo.jpg";

function Footer() {
  return (
    <>
      <style>
        {`
          footer, footer *, footer a, footer div, footer li {
            color: #fff !important;
          }
          footer a:hover {
            color: #ff9800 !important;
          }
        `}
      </style>
      <footer
        style={{
          background: "#0a1833",
          color: "#fff",
          padding: "40px 0 0 0",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 16px",
            color: "#fff",
          }}
        >
          {/* Top Row: Contact Info */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #22325a",
              paddingBottom: 32,
              marginBottom: 32,
              flexWrap: "wrap",
              gap: 24,
              color: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "#fff",
              }}
            >
              <LocationOnIcon style={{ color: "#ff9800", fontSize: 28 }} />
              <div style={{ color: "#fff" }}>
                <div style={{ fontWeight: 600, color: "#fff" }}>
                  Via Paradigna, 133
                </div>
                <div style={{ color: "#fff" }}>43122 Parma</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "#fff",
              }}
            >
              <EmailIcon style={{ color: "#ff9800", fontSize: 28 }} />
              <div style={{ color: "#fff" }}>
                <div style={{ color: "#fff" }}>Email us :</div>
                <a
                  href="mailto:info@eurodieselparma.com"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  info@eurodieselparma.com
                </a>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "#fff",
              }}
            >
              <PhoneIcon style={{ color: "#ff9800", fontSize: 28 }} />
              <div style={{ color: "#fff" }}>
                <div style={{ color: "#fff" }}>Call us on :</div>
                <a
                  href="tel:+390461996222"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  +39 0461 996222
                </a>
              </div>
            </div>
          </div>
          {/* Main Row: Company, Links, Services */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 32,
              color: "#fff",
            }}
          >
            {/* Company Info */}
            <div style={{ flex: 2, minWidth: 260, color: "#fff" }}>
              <img
                src={eurodieselLogo}
                alt="EURODIESEL PARMA S.p.A."
                style={{ height: 48, marginBottom: 16 }}
              />
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 8,
                  color: "#fff",
                }}
              >
                EURODIESEL PARMA S.p.A.
              </div>
              <div style={{ fontSize: 15, color: "#fff", marginBottom: 12 }}>
                EURODIESEL PARMA S.p.A. is your trusted partner for advanced
                diesel and fleet solutions. We deliver excellence in service,
                diagnostics, and parts for leading brands. Your performance, our
                passion.
              </div>
            </div>
            {/* Useful Links */}
            <div style={{ flex: 1, minWidth: 160, color: "#fff" }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  marginBottom: 12,
                  color: "#fff",
                }}
              >
                Useful Links
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "#fff",
                }}
              >
                <li style={{ color: "#fff" }}>
                  <a href="/" style={{ color: "#fff", textDecoration: "none" }}>
                    Home
                  </a>
                </li>
                <li style={{ color: "#fff" }}>
                  <a
                    href="/about"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    About Us
                  </a>
                </li>
                <li style={{ color: "#fff" }}>
                  <a
                    href="/contact"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    Contact Us
                  </a>
                </li>
                <li style={{ color: "#fff" }}>
                  <a
                    href="/services"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    Services
                  </a>
                </li>
              </ul>
            </div>
            {/* Our Services */}
            <div style={{ flex: 1, minWidth: 180, color: "#fff" }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  marginBottom: 12,
                  color: "#fff",
                }}
              >
                Our Services
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "#fff",
                }}
              >
                <li style={{ color: "#fff" }}>
                  Riparazione e servizio pneumatici
                </li>
                <li style={{ color: "#fff" }}>
                  Controllo e taratura tachigrafo
                </li>
                <li style={{ color: "#fff" }}>Scarico dati tachigrafo</li>
                <li style={{ color: "#fff" }}>Riparazione rimorchi</li>
                <li style={{ color: "#fff" }}>
                  Riparazione veicoli industriali
                </li>
                <li style={{ color: "#fff" }}>Riparazione bus</li>
              </ul>
            </div>
          </div>
          {/* Bottom Bar */}
          <div
            style={{
              borderTop: "1px solid #22325a",
              marginTop: 32,
              padding: "16px 0 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 14,
              color: "#fff",
              flexWrap: "wrap",
            }}
          >
            <div style={{ color: "#fff" }}>
              © {new Date().getFullYear()}{" "}
              <span style={{ fontWeight: 700, color: "#fff" }}>
                EURODIESEL PARMA S.p.A.
              </span>
              . Excellence in Diesel Service & Fleet Solutions.
            </div>
            <div style={{ color: "#fff" }}>
              Powered by{" "}
              <span style={{ color: "#fff", fontWeight: 600 }}>
                Eurodiesel IT
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
