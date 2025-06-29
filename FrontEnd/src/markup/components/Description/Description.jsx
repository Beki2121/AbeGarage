import React from "react";
import { useTranslation } from "react-i18next";
import image8 from "../../../assets/images/misc/ethiopianwomanmechanic.jpeg";

function Description() {
  const { t } = useTranslation();
  return (
    <div>
      <section className="about-section-three">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-7">
              <div className="content">
                <h2>
                  {t("We are highly skilled mechanics")} <br />{" "}
                  {t("for your car repair")}
                </h2>
                <div className="text">
                  <p>{t("description_p1")}</p>
                  <p>{t("description_p2")}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="image">
                <img src={image8} alt="mechanic" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Description;
