import React from 'react';
import { useTranslation } from 'react-i18next';

const WhyChooseUs = () => {
  const { t } = useTranslation();
  return (
    <section className="why-choose-us-section">
      <div className="auto-container">
        <div className="sec-title">
          <h2>{t('Why Choose Us')}</h2>
          <div className="text">{t('whychooseus_intro')}</div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="feature-block-one">
              <div className="inner-box">
                <div className="icon"><span className="flaticon-mechanic"></span></div>
                <h5>{t('Expert Technicians')}</h5>
                <div className="text">{t('whychooseus_expert')}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="feature-block-one">
              <div className="inner-box">
                <div className="icon"><span className="flaticon-car-service"></span></div>
                <h5>{t('Comprehensive Services')}</h5>
                <div className="text">{t('whychooseus_comprehensive')}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="feature-block-one">
              <div className="inner-box">
                <div className="icon"><span className="flaticon-customer-service"></span></div>
                <h5>{t('Customer Focused')}</h5>
                <div className="text">{t('whychooseus_customer')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
