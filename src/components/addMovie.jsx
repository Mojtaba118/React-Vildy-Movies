import React, { Component } from "react";
import Form from "./commons/form";
import Joi from "joi-browser";
import { saveMovie, getMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class AddMovie extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    const { match, history } = this.props;
    try {
      if (match.params.id === "new") return;
      const { data: movie } = await getMovie(match.params.id);
      this.setState({ data: this.bindViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }
  bindViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  doSubmit = async e => {
    const { data } = this.state;

    await saveMovie(data);
    this.props.history.push("/");
  };

  render() {
    const { genres } = this.state;
    return (
      <div>
        {this.state.data._id ? <h1>Edit Movie</h1> : <h1>Add Movie</h1>}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect(
            "genreId",
            "Genre",
            genres,
            this.state.data.genreId
          )}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default AddMovie;
