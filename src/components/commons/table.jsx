import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = ({ columns, sortItems, sortOrder, items }) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortItems={sortItems}
        sortOrder={sortOrder}
      />
      <TableBody items={items} columns={columns} />
    </table>
  );
};

export default Table;
