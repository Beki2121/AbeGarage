import React from "react";

const ValidationError = ({ error }) => {
  if (!error) return null;
  return (
    <div className="validation-error" role="alert">
      {error}
    </div>
  );
};

export default ValidationError;
