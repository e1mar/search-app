import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchRes: "The Matrix",
      arrOmdb: [],
      recentSearch: []
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

    let inputValue = document.getElementById("search").value;
    let arrInput = JSON.parse(localStorage.getItem("key")) || [];
    arrInput.push(inputValue);
    if (arrInput.length > 10) arrInput.shift();
    localStorage.setItem("key", JSON.stringify(arrInput));

    console.log(arrInput);

    this.setState({
      arrOmdb: dataOmdb.Search,
      recentSearch: arrInput
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
          <h2 id="recent-search">Recent searches</h2>
          <select id="dropdown" onChange={this.handleChange}>
            {this.state.recentSearch.map(recentSearch => {
              return <option value={recentSearch}> {recentSearch} </option>;
            })}
          </select>
          <h3 id="movies-header">Movies</h3>
          {this.state.arrOmdb.map(movie => (
            <div id="movie" key={movie.imdbID}>
              <div>
                <h1 id="movie-title-header">Title:</h1>{" "}
                <h2 id="movie-title">{movie.Title}</h2>
              </div>
              <div>
                <h1 id="movie-year-header">Year:</h1>{" "}
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
