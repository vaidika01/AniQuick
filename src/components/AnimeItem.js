import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

function AnimeItem() {
  const { id } = useParams();

  //state
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);

  //destructure anime
  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime;

  //get anime based on id
  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();
    setAnime(data.data);
  };

  //get characters
  const getCharacters = async (anime) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${anime}/characters`
    );
    const data = await response.json();
    setCharacters(data.data);
    console.log(data.data);
  };

  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, []);

  return (
    <AnimeItemStyled>
      <h1>{title}</h1>
      <div className="details">
        <div className="detail">
          <div className="image">
            <img src={images?.jpg.large_image_url} alt="" />
          </div>
          <div className="anime-details">
            <p>
              <span>Aired:</span>
              <span>{aired?.string}</span>
            </p>
            <p>
              <span>Rating:</span>
              <span>{rating}</span>
            </p>
            <p>
              <span>Rank:</span>
              <span>{rank}</span>
            </p>
            <p>
              <span>Score:</span>
              <span>{score}</span>
            </p>
            <p>
              <span>Scored By:</span>
              <span>{scored_by}</span>
            </p>
            <p>
              <span>Popularity:</span>
              <span>{popularity}</span>
            </p>
            <p>
              <span>Status:</span>
              <span>{status}</span>
            </p>
            <p>
              <span>Source:</span>
              <span>{source}</span>
            </p>
            <p>
              <span>Season:</span>
              <span>{season}</span>
            </p>
            <p>
              <span>Duration:</span>
              <span>{duration}</span>
            </p>
          </div>
        </div>
        <p className="description">
          {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
          <button
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            {showMore ? "Show Less" : "Read More"}
          </button>
        </p>
      </div>
      <h3 className="title">Trailer</h3>
      <div className="trailer-con">
        {trailer?.embed_url ? (
          <iframe
            src={trailer?.embed_url}
            title="Inline Frame Example"
            width="800"
            height="450"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <h3>Trailer not available</h3>
        )}
      </div>
      <h3 className="title">Characters</h3>
      <div className="characters">
        {characters?.map((character, index) => {
          const { role } = character;
          const { images, name, mal_id } = character.character;
          return (
            <Link to={`/character/${mal_id}`} key={index}>
              <div className="character">
                <img src={images?.jpg.image_url} alt="" />
                <h4>{name}</h4>
                <p>{role}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </AnimeItemStyled>
  );
}

const AnimeItemStyled = styled.div`
  padding: 2rem 5rem;
  background-color: #f4f4f4;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    cursor: pointer;
    background: linear-gradient(to right, #e73827, #ff7e67);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: skew(-3deg);
    }
  }

  .title {
    margin: 2rem 0 1rem 0;
    font-size: 1.8rem;
    cursor: pointer;
    background: linear-gradient(to right, #e73827, #ff7e67);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    margin-top: 1.5rem;
    color: #454e56;
    line-height: 1.6rem;
    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 1.1rem;
      color: #e73827;
      font-weight: 600;
    }
  }

  .trailer-con {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    iframe {
      outline: none;
      border: 4px solid #dedede;
      padding: 1rem;
      border-radius: 10px;
      background-color: #ffffff;
    }
  }

  .details {
    background-color: #fff;
    border-radius: 15px;
    padding: 2rem;
    border: 4px solid #dedede;
    margin-top: 1.5rem;

    .detail {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 2rem;

      img {
        border-radius: 10px;
        width: 100%;
        height: auto;
      }
    }

    .anime-details {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;

      p {
        display: flex;
        justify-content: flex-start;
        align-items: baseline;
        gap: 0.5rem;
        margin: 0.4rem 0;
        font-size: 1.1rem;

        span:first-child {
          font-weight: 700;
          color: #e73827;
          min-width: 100px;
        }

        span:last-child {
          color: #454e56;
          flex: 1;
        }
      }
    }
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 1.5rem;
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 15px;
    border: 4px solid #dedede;
    margin-top: 2rem;

    .character {
      padding: 0.5rem;
      border-radius: 10px;
      background-color: #f2f2f2;
      transition: all 0.3s ease-in-out;

      img {
        width: 100%;
        height: 150px;
        border-radius: 10px;
        object-fit: cover;
      }

      h4 {
        padding: 0.5rem 0;
        color: #454e56;
        font-size: 1.1rem;
        text-decoration: none;
      }

      p {
        color: #e73827;
        font-size: 0.95rem;
        text-decoration: none;
      }

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }

  @media (max-width: 1200px) {
    padding: 2rem 3rem;

    .details {
      .detail {
        grid-template-columns: 1fr;
      }
    }
  }

  @media (max-width: 900px) {
    padding: 2rem 1.5rem;

    h1 {
      font-size: 2rem;
    }

    .title {
      font-size: 1.5rem;
    }

    .description {
      button {
        font-size: 1rem;
      }
    }

    .details {
      .detail {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    .characters {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
  }

  @media (max-width: 600px) {
    padding: 1rem;

    h1 {
      font-size: 1.5rem;
    }

    .title {
      font-size: 1.2rem;
    }

    .description {
      button {
        font-size: 0.9rem;
      }
    }

    .details {
      .detail {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
    }

    .characters {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
  }
`;

export default AnimeItem;
