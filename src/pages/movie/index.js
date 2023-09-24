// Movie.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

const Movie = () => {
  const { id } = useParams();
  const imagePath = "https://image.tmdb.org/t/p/w500";

  const [movie, setMovie] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar se é favorito
  const KEY = process.env.REACT_APP_KEY;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        const res = data.results;
        let filme = res.find((key) => {
          return key.id == id;
        });
        setMovie(filme);
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
    <div>
           <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">CINEFLIX</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
             <Link to="/"> 
             <li class="nav-item">
               
                <a class="nav-link" href="#">Home</a>
              </li> 
              </Link>
              <Link to="/Favoritos">
                <li class="nav-item">
                  <a class="nav-link" href="#">Favoritos</a>
                </li>
              </Link>
              <Link to="/">
              <li class="nav-item">
                <a class="nav-link" href="#movie-list">Filmes</a>
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
            <button className="link_button">Voltar</button>
          </Link>
          <button className="favorito-button" onClick={toggleFavorite}>
            {isFavorite ? "Remover dos Favoritos" : "Favoritar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
