import React from "react";
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <div>
      <footer className="main-footer">
        <div className="upper-box">
          <div className="auto-container">
            <div className="row no-gutters pt-5">
              <div className="footer-info-box col-md-4 col-sm-12">
                <div className="info-inner">
                  <div className="content">
                    <div className="icon">
                      <span className="flaticon-pin"></span>
                    </div>
                    <div className="text">
                      {t('123 Main St, Evangadi City, MD 20601')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="footer-info-box col-md-4 col-sm-12">
                <div className="info-inner">
                  <div className="content">
                    <div className="icon">
                      <span className="flaticon-email"></span>
                    </div>
                    <div className="text">
                      {t('Email us')} : <br />{" "}
                      <a href="mailto:contact.contact@autorex.com">
                        contact@abegarage.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="footer-info-box col-md-4 col-sm-12 ">
                <div className="info-inner">
                  <div className="content">
                    <div className="icon">
                      <span className="flaticon-phone"></span>
                    </div>
                    <div className="text">
                      {t('Call us on')} : <br />
                      <strong>+ 1800 456 7890</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="widgets-section">
          <div className="auto-container">
            <div className="widgets-inner-container">
              <div className="row clearfix">
                <div className="footer-column col-lg-6">
                  <div className="widget widget_about">
                    <div className="logo">
                      <a href="/">
                        <img
                          src="/eurodiesel-logo.jpg"
                          alt="EURODIESEL PARMA S.p.A."
                          style={{ height: 60 }}
                        />
                      </a>
                    </div>
                    <div className="text">
                      {t('EURODIESEL PARMA S.p.A. is your trusted partner for advanced diesel and fleet solutions. We deliver excellence in service, diagnostics, and parts for leading brands. Your performance, our passion.')}
                    </div>
                  </div>
                </div>

                <div className="footer-column col-lg-6">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="widget widget_links">
                        <h4 className="widget_title">{t('Useful Links')}</h4>
                        <div className="widget-content">
                          <ul className="list">
                            <li>
                              <a href="/">{t('Home')}</a>
                            </li>
                            <li>
                              <a href="/about">{t('About Us')}</a>
                            </li>
                            <li>
                              <a href="/contact">{t('Contact Us')}</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="widget widget_links">
                        <h4 className="widget_title">{t('Our Services')}</h4>
                        <div className="widget-content">
                          <ul className="list">
                            <li>
                              <a href="#">{t('Performance Upgrade')}</a>
                            </li>
                            <li>
                              <a href="#">{t('Transmission Services')}</a>
                            </li>
                            <li>
                              <a href="#">{t('Break Repair & Service')}</a>
                            </li>
                            <li>
                              <a href="#">{t('Engine Service & Repair')}</a>
                            </li>
                            <li>
                              <a href="#">{t('Tyre & Wheels')}</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="auto-container">
          <div className="footer-bottom">
            <div className="copyright-text">
              © 2024 <a href="#">EURODIESEL PARMA S.p.A.</a>. {t('Excellence in Diesel Service & Fleet Solutions.')}
            </div>
            <div className="text">
              {t('Powered by')} <a href="#">Eurodiesel IT</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
