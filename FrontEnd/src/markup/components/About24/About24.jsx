import React from "react";
import { useTranslation } from 'react-i18next';
import vban1 from "../../../assets/images/misc/vban1.jpg";
import vban2 from "../../../assets/images/misc/vban2.jpg";
const About24 = () => {
  const { t } = useTranslation();
  return (
    <section className="about-section">
      <div className="auto-container">
        <div className="row">
          <div className="col-lg-5">
            <div className="image-box">
              <img src={vban1} alt="engine oil" />
              <img src={vban2} alt="engine parts" />
              <div className="year-experience" data-parallax='{"y": 30}'>
                <strong>24</strong> {t('years')} <br />
                {t('Experience')}
              </div>
            </div>
          </div>
          <div className="col-lg-7 pl-lg-5">
            <div className="sec-title">
              <h5>{t('Welcome to our workshop')}</h5>
              <h2>{t('We have 24 years experience')}</h2>
              <div className="text">
                <p>
                  {t('about24_p1')}
                </p>
                <p>
                  {t('about24_p2')}
                </p>
              </div>
              <div className="link-btn mt-40">
                <a href="/about" className="theme-btn btn-style-one style-two">
                  <span>
                    {t('About Us')} <i className="flaticon-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About24;
