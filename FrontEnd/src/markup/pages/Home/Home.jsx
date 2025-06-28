import React from "react";
import { useTranslation } from 'react-i18next';
import TopBanner from "../../components/Banner/TopBannerHome";
import About24 from "../../components/About24/About24";
import ServicesSec from "../../components/ServiceSec/ServicesSec";
import FeaturesSec from "../../components/FuaturesSec/FeaturesSec";
import WhyChooseUs from "../../components/WyChoosUS/WhyChooseUs";
import BottomBanner from "../../components/Banner/BottomBanner";
import CtaSec from "../../components/CtaSec/CtaSec";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="page-wrapper">
      {/* Video Section */}
      <TopBanner />
      {/* About Us Section */}
      <About24 />
      {/* Services Section */}
      <ServicesSec />
      {/* Services Section */}
      <FeaturesSec />
      {/* Why Choose US Section */}
      <WhyChooseUs />
      {/* Video Section */}
      <BottomBanner />
      {/* CTA Section */}
      <CtaSec />
    </div>
  );
};

export default Home;
