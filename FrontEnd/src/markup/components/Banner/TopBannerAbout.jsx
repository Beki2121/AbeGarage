import React from "react";
import { useTranslation } from 'react-i18next';
import b3 from "../../../assets/images/banner/banner2_darker.jpg";

function TopBannerAbout() {
  const { t } = useTranslation();
  return (
    <div>
      <section className="page-title" style={{ backgroundImage: `url(${b3})` }}>
        <div className="auto-container">
          <h2>{t('About us')}</h2>
          <ul className="page-breadcrumb">
            <li>
              <a href="/">{t('home')}</a>
            </li>
            <li>{t('About us')}</li>
          </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>{t('Car Repairing')}</h1>
      </section>
    </div>
  );
}

export default TopBannerAbout;
