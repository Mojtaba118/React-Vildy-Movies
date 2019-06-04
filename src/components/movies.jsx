import React, { Component } from "react";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./commons/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./commons/sideList";
import MoviesTable from "./movieTable";
import { Link } from "react-router-dom";
import SearchBox from "./commons/searchBox";
import _ from "lodash";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    currentGenre: { _id: "", name: "All Genres" },
    sortOrder: { sortBy: "title", orderBy: "asc" },
    searchQuery: ""
  };
  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }
  handleDelete = async id => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== id);
    this.setState({
      movies
    });
    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This Movie is Not Exist");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChanged = page => {
    if (this.state.currentPage === page) return;
    this.setState({ currentPage: page });
  };
  handleGenreChanged = genre => {
    if (this.state.currentGenre && this.state.currentGenre._id === genre._id)
      return;
    this.setState({ currentGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = sortOrder => {
    this.setState({ sortOrder });
  };

  handleSearch = query => {
    this.setState({ currentGenre: null, searchQuery: query, currentPage: 1 });
  };
  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      sortOrder,
      currentGenre,
      searchQuery
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = filtered.filter(
        m => m.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
      );
    else if (currentGenre && currentGenre._id)
      filtered = filtered.filter(m => m.genre._id === currentGenre._id);

    const sortedMovies = _.orderBy(
      filtered,
      [sortOrder.sortBy],
      [sortOrder.orderBy]
    );
    const movies = paginate(sortedMovies, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    if (this.state.movies.length === 0)
      return <p>There Are No Movies To Show</p>;
    const { totalCount, data } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onGenreChanged={this.handleGenreChanged}
            currentGenre={this.state.currentGenre}
          />
        </div>
        <div className="col">
          {this.props.user && (
            <Link to="/movies/new" className="btn btn-primary mb-3">
              Add Movie
            </Link>
          )}
          <p>There Are {totalCount} Movies</p>
          <p>
            There Are {data.filter(movie => movie.liked).length} Movies As
            Favorite
          </p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movies={data}
            sortOrder={this.state.sortOrder}
            onSort={this.handleSort}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            count={totalCount}
            pageSize={this.state.pageSize}
            onPageChanged={this.handlePageChanged}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
