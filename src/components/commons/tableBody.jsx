import React, { Component } from "react";
import _ from "lodash";
class TableBody extends Component {
  handleTableData = (item, column) => {
    if (column.contentEL) return column.contentEL(item);

    return _.get(item, column.unique);
  };
  createKey = (item, column) => {
    return item._id + (column.unique || column.key);
  };
  render() {
    const { items, columns } = this.props;
    return (
      <tbody>
        {items.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.handleTableData(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
