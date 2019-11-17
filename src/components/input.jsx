import React from "react";

export default ({
  label,
  onChange,
  value,
  placeholder,
  isRequired,
  type = "text"
}) => (
  <div className="input-with-label">
    {label && <p className="input-label">{label}</p>}
    <input
      className="input-box"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={isRequired}
    />
  </div>
);
