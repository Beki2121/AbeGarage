import React from "react";
import { useTranslation } from 'react-i18next';
import banner1 from "../../../assets/images/banner/banner1.jpg";
const TopBanner = () => {
  const { t } = useTranslation();
  return (
    <section className="video-section">
      <div
        data-parallax='{"y": 50}'
        className="sec-bg"
        style={{ backgroundImage: `url(${banner1})`, objectFit: "contain" }}
      ></div>
      <div className="auto-container">
        <h5>{t('Working since 1992')}</h5>
        <h2>
          {t('Tuneup Your Car')} <br /> {t('to Next Level')}
        </h2>
        <div className="video-box">
          <div className="video-btn">
            <a
              href="https://youtu.be/PUkAIAIzA0I?si=ugtpBZ2RHYXcn037"
              className="overlay-link lightbox-image video-fancybox ripple"
              target="_blank"
            >
              <i className="flaticon-play"></i>
            </a>
          </div>
          <div className="text">
            {t('Watch intro video')} <br /> {t('about us')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopBanner;
