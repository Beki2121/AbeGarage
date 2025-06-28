import React from "react";

const SubmitButton = ({ loading, children, ...rest }) => (
  <button
    className="theme-btn btn-style-one"
    type="submit"
    data-loading-text="Please wait..."
    disabled={loading}
    {...rest}
  >
    {loading ? <span>Loading...</span> : <span>{children}</span>}
  </button>
);

export default SubmitButton;
