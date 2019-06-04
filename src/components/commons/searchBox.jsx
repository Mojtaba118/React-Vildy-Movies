import React from "react";
const SearchBox = ({ onChange, value }) => {
  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Enter Movie Name..."
        onChange={e => onChange(e.currentTarget.value)}
        value={value}
      />
    </div>
  );
};

export default SearchBox;
