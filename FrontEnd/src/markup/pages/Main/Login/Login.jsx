import React from "react";
import { useTranslation } from 'react-i18next';
import LoginForm from "../../../components/LoginForm/LoginForm";

function Login() {
  const { t } = useTranslation();
  return (
    <div className="row">
      <div className="col-md-3 "></div>
      <div className="col-md-9">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
