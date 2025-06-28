import React from "react";
import { useTranslation } from 'react-i18next';
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import ServiceList from "../../../components/Admin/Service/ServiceList";

function ServicePage() {
  const { t } = useTranslation();
  return (
    <div>
        <div>
            <div className="container-fluid admin-pages">
                <div className="row">
                    <div className="col-md-3 admin-left-side">
                      <AdminMenu />
                    </div>
                    <div className="col-md-9 admin-right-side ">
                      <ServiceList />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ServicePage;