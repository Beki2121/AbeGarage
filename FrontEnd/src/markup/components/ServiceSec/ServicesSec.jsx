import React from 'react'
import { useTranslation } from 'react-i18next';

const serviceCards = [
  {
    icon: 'flaticon-tire',
    title: 'Riparazione e servizio pneumatici',
    desc: 'desc_riparazione_pneumatici',
  },
  {
    icon: 'flaticon-dashboard',
    title: 'Controllo e taratura tachigrafo',
    desc: 'desc_controllo_tachigrafo',
  },
  {
    icon: 'flaticon-download',
    title: 'Scarico dati tachigrafo',
    desc: 'desc_scarico_tachigrafo',
  },
  {
    icon: 'flaticon-trailer',
    title: 'Riparazione rimorchi',
    desc: 'desc_riparazione_rimorchi',
  },
  {
    icon: 'flaticon-truck',
    title: 'Riparazione veicoli industriali',
    desc: 'desc_riparazione_veicoli_industriali',
  },
  {
    icon: 'flaticon-bus',
    title: 'Riparazione bus',
    desc: 'desc_riparazione_bus',
  },
];

const ServicesSec = () => {
  const { t } = useTranslation();
  return (
    <section className="services-section">
      <div className="auto-container">
        <div className="sec-title style-two">
          <h2>{t('Our Services')}</h2>
          <div className="text">{t('servicessec_intro')}</div>
        </div>
        <div className="row">
          {serviceCards.map((service) => (
            <div className="col-lg-4 service-block-one" key={service.title}>
              <div className="inner-box hvr-float-shadow text-center p-4">
                <div className="icon mb-3" style={{fontSize: '3rem', color: '#fff'}}>
                  <span className={service.icon}></span>
                </div>
                <h2 className="mb-2">{t(service.title)}</h2>
                <p className="mb-3">{t(service.desc)}</p>
                <a href="#" className="read-more">{t('read more +')}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSec;
