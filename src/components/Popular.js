import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import { AnimeGridStyled } from "./AnimeGridStyled";

function Popular({ rendered }) {
  const { popularAnime, searchResults, isSearch } = useGlobalContext();

  const conditionalRender = () => {
    if (rendered === "popular" && !isSearch) {
      return popularAnime.length ? (
        popularAnime.map((anime) => (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt={anime.title} />
          </Link>
        ))
      ) : (
        <p>No popular anime available.</p>
      );
    } else if (rendered === "popular" && isSearch) {
      return searchResults.length ? (
        searchResults.map((anime) => (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt={anime.title} />
          </Link>
        ))
      ) : (
        <p>No search results found.</p>
      );
    }
    return <p>Please select a category.</p>;
  };

  return (
    <AnimeGridStyled>
      <div className="anime-grid">{conditionalRender()}</div>
    </AnimeGridStyled>
  );
}

export default Popular;
