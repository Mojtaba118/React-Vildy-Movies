import React from "react";

const ListGroup = props => {
  const { items, onGenreChanged, currentGenre, textProp, valueProp } = props;
  return (
    <div className="list-group m-2">
      {items.map(item => (
        <a
          key={item[valueProp]}
          href="#"
          className={
            currentGenre && currentGenre[valueProp] === item[valueProp]
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          onClick={() => onGenreChanged(item)}
        >
          {item[textProp]}
        </a>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  textProp: "name",
  valueProp: "_id"
};

export default ListGroup;
