
import React from "react";
import { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn } from "./style";
import { Link } from "react-router-dom";
import "./style.css";


const Favoritos = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const [searchValue, setSearchValue] = useState("");

  return (
    <Container>
      <div className="body">
        <div className="imagem_banner">
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
          <div className="banner_content">
            <div className="centered-content">
              <h1 className="titulo">Seus favoritos do momento</h1>
              <a href="#movie-list">
                <button className="button-34" role="button">Favoritos</button>
              </a>

            </div>
          </div>
        </div>
      </div>
      <ul>
        <MovieList id="movie-list">
          {favorites.map((fav) => (
            <div key={fav.id} style={{ marginRight: "20px" }}>
              <Movie>
                <img
                  src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
                  alt={fav.title}
                />
                {fav.title}
              </Movie>
            </div>
          ))}
        </MovieList>
      </ul>

    </Container>
  );
};

export default Favoritos;

