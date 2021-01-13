import React, { Component } from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends Component {
  /*
    constructor(props) {
    super(props);
    console.log("props?");
  }
   */
  state = {
    isLoading: true,
    movies: [],
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
    );
    this.setState({ movies: movies, isLoading: false }); //앞에껀 state, 뒤에껀 비구조화할당 movies. // movies라고 축약해서 쓸 수 있음.
  };

  componentDidMount() {
    this.getMovies();
    //영화 데이터 로딩!
  }
  render() {
    console.log("Home render");
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                ></Movie>
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
