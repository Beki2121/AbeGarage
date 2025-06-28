import React from "react";
import { useTranslation } from 'react-i18next';
import TopBannerContactUs from "../../../components/Banner/TopBannerContactUs";
import ContactForm from "../../../components/Email/ContactForm";
import BottomBanner from "../../../components/Banner/BottomBanner";
import CtaSec from "../../../components/CtaSec/CtaSec";

function Contact() {
  const { t } = useTranslation();
  return (
    <div>
      <TopBannerContactUs />
      <ContactForm />
      <BottomBanner />
      <CtaSec />
    </div>
  );
}

export default Contact;
