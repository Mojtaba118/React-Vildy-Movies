import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./commons/like";
import Table from "./commons/table";
import auth from "./../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      unique: "title",
      content: "Title",
      contentEL: item => <Link to={`/movies/${item._id}`}>{item.title}</Link>
    },
    { unique: "genre.name", content: "Genre" },
    { unique: "numberInStock", content: "Stock" },
    { unique: "dailyRentalRate", content: "Rate" },
    {
      key: "like",
      contentEL: item => (
        <Like liked={item.liked} onClick={() => this.props.onLike(item)} />
      )
    }
  ];


  deleteColumn = {
    key: "delete",
    contentEL: item => (
      <button
        onClick={() => this.props.onDelete(item._id)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  sortItems = sortBy => {
    const sortOrder = { ...this.props.sortOrder };
    if (sortOrder.sortBy === sortBy) {
      sortOrder.orderBy = sortOrder.orderBy === "asc" ? "desc" : "asc";
    } else {
      sortOrder.sortBy = sortBy;
      sortOrder.orderBy = "asc";
    }
    this.props.onSort(sortOrder);
  };

  render() {
    const { movies, sortOrder } = this.props;
    return (
      <Table
        columns={this.columns}
        sortItems={this.sortItems}
        sortOrder={sortOrder}
        items={movies}
      />
    );
  }
}

export default MoviesTable;
