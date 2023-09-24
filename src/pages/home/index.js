//eslint-disable-next-line
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Movie, MovieList,Btn } from "./style";
import { Link } from "react-router-dom";
import "./style.css";

function Home() {


    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
    }, [KEY]);

    const handleSearch = () => {
        if (searchValue.trim() !== "") {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchValue}&language=pt-BR`)
                .then((response) => response.json())
                .then((data) => {

                    setMovies(data.results);
                })
                .catch((error) => {
                    console.error("Erro ao buscar filmes:", error);
                });
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value);
    };


    const handleSearchButtonClick = () => {
        handleSearch();
    };


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
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Home</a>
                                    </li>
                                    <Link to="/Favoritos">
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Favoritos</a>
                                    </li>
                                    </Link>
                                    
                                    <li class="nav-item">
                                        <a class="nav-link" href="#movie-list">Filmes</a>
                                    </li>

                                </ul>
                                <div class="search-box">
                                    <input
                                        class="search-txt"
                                        type="text"
                                        placeholder="Tecle para pesquisar"
                                        value={searchValue}
                                        onChange={handleSearchInputChange}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                handleSearch();
                                            }
                                        }}
                                    />
                                    <a href="#" class="search-button" onClick={handleSearchButtonClick}>
                                        <i class="fas fa-search"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="banner_content">
                        <div className="centered-content">
                            <h1 className="titulo">Os melhores filmes estão aqui</h1>
                            <a href="#movie-list">
                                <button className="button-34" role="button">Filmes</button>
                            </a>
                           
                        </div>
                    </div>
                </div>
                <MovieList id="movie-list">
                {movies.map((movie) => {
                    return (
                    <Link to={`/${movie.id}`}>
                        <Movie key={movie.id}>
                            <img
                                src={`${imagePath}${movie.poster_path}`}
                                alt="{movie.title}"
                            />
                        
                        </Movie>   
                         </Link>
                    );
                })}
            </MovieList>
            </div>
        </Container>

    );
}

export default Home;
