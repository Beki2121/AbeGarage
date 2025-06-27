import React from "react";
import { useTranslation } from 'react-i18next';
import BottomBanner from "../../../components/Banner/BottomBanner";
import TopBannerService from "../../../components/Banner/TopBannerService";
import CtaSec from "../../../components/CtaSec/CtaSec";
import ServicesSec from "../../../components/ServiceSec/ServicesSec";
import WhyChooseUs from "../../../components/WyChoosUS/WhyChooseUs";

function Services() {
  const { t } = useTranslation();
  return (
    <div>
      <TopBannerService />
      <ServicesSec />
      <WhyChooseUs />
      <BottomBanner />
      <CtaSec />
    </div>
  );
}

export default Services;
