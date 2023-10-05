
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

const RelatedMovies = ({ movieId }) => {
  const imagePath = "https://image.tmdb.org/t/p/w500";

  const [relatedMovies, setRelatedMovies] = useState([]);
  const KEY = process.env.REACT_APP_KEY;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${KEY}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        setRelatedMovies(data.results);
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes relacionados:", error);
      });
  }, [movieId, KEY]);

  return (
    <div className="related-movies">
      <h2 className="relacinadoos">Titulos semelhantes</h2>
      <div className="related-movie-list">
        {relatedMovies.map((movie) => (
          <Link to={`/${movie.id}`} key={movie.id}>
            <div className="related-movie">
              <img
                src={`${imagePath}${movie.poster_path}`}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


const Movie = () => {
  const { id } = useParams();
  const imagePath = "https://image.tmdb.org/t/p/w500";

  const [movie, setMovie] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const KEY = process.env.REACT_APP_KEY;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setMovie(data);
        } else {
          console.error("No movie data found in the API response.");
        }
      });
  }, [id, KEY]);

  useEffect(() => {
    // Verificar se o filme está nos favoritos no carregamento
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === movie.id));
  }, [movie]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Remover dos favoritos
      const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Adicionar aos favoritos
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    // Inverta o estado de isFavorite
    setIsFavorite(!isFavorite);
  };

  

  return (
    <div >
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">CINEFLIX</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
              <Link to="/">
                <li className="nav-item">

                  <a className="nav-link" href="#">Home</a>
                </li>
              </Link>
              <Link to="/Favoritos">
                <li className="nav-item">
                  <a className="nav-link" href="#">Favoritos</a>
                </li>
              </Link>
              <Link to="/">
                <li className="nav-item">
                  <a className="nav-link" href="#movie-list">Filmes</a>
                </li>
              </Link>
            </ul>

          </div>
        </div>
      </nav>
      <div className="container">
        <div className="movie-info">
          <img
            className="img_movie"
            src={`${imagePath}${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="descricao">
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <p className="movie-desc">{movie.overview}</p>
          </div>
        </div>
        <div className="actions">
          <Link to="/">
            <button className="button-62 link_button" role="button">Voltar</button>
          </Link>
          <button className="favorito-button button-62 link_button " role="button" onClick={toggleFavorite}>
            {isFavorite ? "Desfavoritar" : "Favoritar"}
          </button>
        </div>
      </div>
      <RelatedMovies movieId={id} />

    </div>
  );
};



export default Movie;
