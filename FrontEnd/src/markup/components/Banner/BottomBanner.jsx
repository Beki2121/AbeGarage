import React from 'react';
import { useTranslation } from 'react-i18next';
import bg1 from '../../../assets/images/banner/wheelntire.jpeg';

const BottomBanner = () => {
  const { t } = useTranslation();
  return (
    <section className="video-section">
      <div className="sec-bg" style={{ backgroundImage: `url(${bg1})`}} data-parallax={{ y: 50 }}></div>
      <div className="auto-container">
        <h5>{t('Working since 1992')}</h5>
        <h2>{t('We are leader in Car Mechanical Work')}</h2>
        <div className="video-box">
          <div className="video-btn">
            <a href="https://youtu.be/PUkAIAIzA0I?si=ugtpBZ2RHYXcn037" className="overlay-link lightbox-image video-fancybox ripple" target= "_blank">
              <i className="flaticon-play"></i>
            </a>
          </div>
          <div className="text">{t('Watch intro video')} <br /> {t('about us')}</div>
        </div>
      </div>
    </section>
  )
}

export default BottomBanner;
