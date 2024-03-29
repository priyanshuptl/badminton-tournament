import React from "react";

export default ({
  label,
  onChange,
  value,
  placeholder,
  isRequired,
  type = "text",
  errorMessage
}) => (
  <div className="input-with-label">
    {label && <p className="input-label">{label}</p>}
    <div className="input-box-container">
      <input
        className="input-box"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
    {errorMessage && <div className="error-message">{errorMessage}</div>}
  </div>
);
