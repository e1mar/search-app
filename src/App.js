import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchRes: "The Matrix",
      arrOmdb: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const omdbUrl =
      "http://www.omdbapi.com/?apikey=125878df&s=" +
      this.state.searchRes +
      "&type=movie";

    const responseOmdb = await fetch(omdbUrl);
    const dataOmdb = await responseOmdb.json();

    this.setState({
      arrOmdb: dataOmdb.Search
    });
  }

  handleChange(event) {
    this.setState({ searchRes: event.target.value });
  }

  handleSubmit(event) {
    this.componentDidMount();
    event.preventDefault();
  }

  render() {
    return (
      <div id="frame">
        <div>
          <form onSubmit={this.handleSubmit}>
            <label className="searchBar">
              <input
                id="search"
                type="Search"
                value={this.state.searchRes}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" id="searchBtn" value="Search" />
          </form>
        </div>

        <div className="movie">
          <h2>Recent searches</h2>
          <h3>Movies</h3>
          {this.state.arrOmdb.map(movie => (
            <div id="movie" key={movie.imdbID}>
              <div>
                <h1 id="movie-title">Title:</h1>{" "}
                <h2 id="movie-title">{movie.Title}</h2>
              </div>
              <div>
                <h1 id="movie-year">Year:</h1>{" "}
                <h2 id="movie-year">{movie.Year}</h2>
              </div>
              <img id="movie-poster" src={movie.Poster} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
