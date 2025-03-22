import React from 'react';

const InputField = ({ type, name, value, onChange, placeholder, required, pattern, autoComplete }) => {
  return (
    <div className="input-group">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        className="input-field"
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default InputField;
