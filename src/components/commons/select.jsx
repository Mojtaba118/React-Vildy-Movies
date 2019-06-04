import React from "react";
const Select = ({ name, selectedItem, error, label, items, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} className="form-control" name={name} id={name}>
        <option value="" />
        {items.map(item => (
          <option
            key={item._id}
            value={item._id}
            selected={item._id === selectedItem}
          >
            {item.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
