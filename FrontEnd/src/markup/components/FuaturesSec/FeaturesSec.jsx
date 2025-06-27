import React from 'react';
import { useTranslation } from 'react-i18next';
import carRev from "../../../assets/images/misc/EngineTacho.jpg";

const FeaturesSec = () => {
  const { t } = useTranslation();
  return (
    <section className="features-section" style={{ background: '#1a237e' }}>
    <div className="auto-container">
      <div className="row">
        <div className="col-lg-6">
          <div className="inner-container">
            <h2>{t('Quality Service And')} <br /> {t('Customer Satisfaction !!')}</h2>
            <div className="text">
            {t('featuressec_text')}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="image"><img src={carRev} alt="engine tachometer" /></div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default FeaturesSec;
