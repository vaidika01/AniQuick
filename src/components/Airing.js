import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import { AnimeGridStyled } from "./AnimeGridStyled";

function Airing({ rendered }) {
  const { airingAnime = [], isSearch, searchResults = [] } = useGlobalContext();

  const conditionalRender = () => {
    const dataToRender = isSearch ? searchResults : airingAnime;
    return dataToRender.map((anime) => (
      <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title || "Anime image"}
        />
      </Link>
    ));
  };

  return (
    <AnimeGridStyled>
      <div className="anime-grid">{conditionalRender()}</div>
    </AnimeGridStyled>
  );
}

export default Airing;
