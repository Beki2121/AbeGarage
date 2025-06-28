import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import Avatar from "react-avatar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure bootstrap CSS is imported
import "./Header.css";
import { useTranslation } from 'react-i18next';

function Header(props) {
  const { t, i18n } = useTranslation();
  const { isLogged, employee, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const updateMedia = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logOut = () => {
    if (window.confirm(t('Are you sure you want to logout?'))) {
      logout();
      navigate("/login");
    }
  };

  const handleAdminClick = (event) => {
    event.preventDefault();
    navigate("/admin");
  };

  const handleEmployeeClick = (event) => {
    event.preventDefault();
    navigate("/admin/orders"); // Employees go to orders page instead of dashboard
  };

  const handleProfileClick = (event) => {
    event.preventDefault();
    navigate(`/admin/employee-profile/${employee?.employee_id}`);
  };

  const isAdmin = employee?.employee_role === 3;
  console.log("is user admin", isAdmin);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <header className="main-header header-style-one">
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="office-hour">
                  {t('Monday - Saturday 7:00AM - 6:00PM')}
                </div>
              </div>
              <div className="right-column d-flex">
                <div style={{ marginRight: 16 }}>
                  <button onClick={() => handleLanguageChange('en')} style={{ marginRight: 4, padding: '2px 8px', borderRadius: 4, border: '1px solid #ccc', background: i18n.language === 'en' ? '#1a237e' : '#fff', color: i18n.language === 'en' ? '#fff' : '#222', cursor: 'pointer' }}>EN</button>
                  <button onClick={() => handleLanguageChange('it')} style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid #ccc', background: i18n.language === 'it' ? '#1a237e' : '#fff', color: i18n.language === 'it' ? '#fff' : '#222', cursor: 'pointer' }}>IT</button>
                </div>
                {isLogged ? (
                  <div className="link-btn">
                    <span 
                      className="welcome-admin-text"
                      style={{ cursor: 'pointer' }}
                      onClick={isAdmin ? handleAdminClick : handleEmployeeClick}
                    >
                      <strong>
                        {isAdmin
                          ? t('Welcome Admin!')
                          : `${t('Welcome')} ${employee?.employee_first_name || ""}!`}
                      </strong>
                    </span>
                  </div>
                ) : (
                  <div className="phone-number">
                    {t('Schedule Appointment')}: <strong>1800 456 7890</strong>
                  </div>
                )}
                {isLogged && (
                  <div className="employee_profile">
                    <Avatar
                      name={employee?.employee_first_name?.charAt(0) || "U"}
                      size="50"
                      textSizeRatio={2}
                      color="#EE100E"
                      round={true}
                      style={{ cursor: "pointer" }}
                      onClick={handleProfileClick}
                      className="avatar"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container">
              <div className="logo-box left-box">
                <div className="logo">
                  <Link to="/">
                    <img
                      src="/eurodiesel-logo.jpg"
                      alt="EURODIESEL PARMA S.p.A."
                      style={{ height: 60 }}
                    />
                  </Link>
                </div>
              </div>
              <div className="right-column">
                <div className="nav-outer">
                  {isMobile && (
                    <div className="hamburger-container">
                      <div className="">
                        <DropdownButton
                          className="dropdown-button"
                          id="dropdown-basic-button"
                          variant="none"
                          title={
                            <div className="hamburger-icon">
                              <span className="hamburger-line"></span>
                              <span className="hamburger-line"></span>
                              <span className="hamburger-line"></span>
                            </div>
                          }
                        >
                          <Dropdown.Item as={Link} to="/">
                            {t('Home')}
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/about">
                            {t('About Us')}
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/services">
                            {t('Services')}
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/contact">
                            {t('Contact Us')}
                          </Dropdown.Item>
                          {isLogged && isAdmin && (
                            <Dropdown.Item as={Link} to="/admin">
                              {t('Dashboard')}
                            </Dropdown.Item>
                          )}
                        </DropdownButton>
                      </div>
                    </div>
                  )}
                  {!isMobile && (
                    <nav className="main-menu navbar-expand-md navbar-light">
                      <div
                        className="collapse navbar-collapse show clearfix"
                        id="navbarSupportedContent"
                      >
                        <ul className="navigation navbar-nav">
                          <li className="dropdown">
                            <Link to="/">{t('Home')}</Link>
                          </li>
                          <li className="dropdown">
                            <Link to="/about">{t('About Us')}</Link>
                          </li>
                          <li className="dropdown">
                            <Link to="/services">{t('Services')}</Link>
                          </li>
                          <li>
                            <Link to="/contact">{t('Contact Us')}</Link>
                          </li>
                          {isLogged && isAdmin && (
                            <li className="dropdown">
                              <Link to="/admin">{t('Dashboard')}</Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    </nav>
                  )}
                </div>
                <div className="search-btn"></div>
                {isLogged ? (
                  <div className="signing-btn">
                    <Link
                      to="/"
                      className="theme-btn btn-style-one blue"
                      onClick={logOut}
                    >
                      {t('Log out')}
                    </Link>
                  </div>
                ) : (
                  <div className="signing-btn">
                    <Link to="/login" className="theme-btn btn-style-one">
                      {t('Login')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
