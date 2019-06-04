import React, { Component } from "react";

class TableHeader extends Component {
  renderSortIcons = column => {
    const { sortOrder } = this.props;
    if (column.unique === sortOrder.sortBy) {
      return sortOrder.orderBy === "asc" ? (
        <i className="fa fa-sort-asc" />
      ) : (
        <i className="fa fa-sort-desc" />
      );
    }
    return null;
  };
  render() {
    const { columns, sortItems } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.unique || column.key}
              onClick={() => sortItems(column.unique)}
            >
              {column.content}
              {this.renderSortIcons(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
