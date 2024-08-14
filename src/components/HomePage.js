import { useState } from "react";
import { useGlobalContext } from "../context/global";
import Popular from "./Popular";
import styled from "styled-components";
import Airing from "./Airing";

function Homepage() {
  const {
    handleSubmit,
    search,
    handleChange,
    getAiringAnime,
    getPopularAnime,
  } = useGlobalContext();

  const [rendered, setRendered] = useState("popular");
  const [loading, setLoading] = useState(false);

  const switchComponent = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      case "airing":
        return <Airing rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  const handleFilterClick = (type) => {
    setRendered(type);
    setLoading(true);

    if (type === "airing") {
      getAiringAnime().finally(() => setLoading(false));
    } else {
      getPopularAnime().finally(() => setLoading(false));
    }
  };

  return (
    <HomepageStyled>
      <header>
        <div className="logo">
          <h1>
            {rendered === "popular"
              ? "Popular Anime"
              : rendered === "airing"
              ? "Airing Anime"
              : "Upcoming Anime"}
          </h1>
        </div>
        <div className="search-container">
          <div className="switch-category">
            <button
              className={`filter-btn ${rendered === "popular" ? "active" : ""}`}
              onClick={() => handleFilterClick("popular")}
              aria-label="Popular Anime"
            >
              Popular <i className="fas fa-fire" aria-hidden="true"></i>
            </button>{" "}
            <button
              className={`filter-btn ${rendered === "airing" ? "active" : ""}`}
              onClick={() => handleFilterClick("airing")}
              aria-label="Airing Anime"
            >
              Airing
            </button>
          </div>
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="input-control">
              <input
                type="text"
                placeholder="Search Anime"
                value={search}
                onChange={handleChange}
                aria-label="Search Anime"
              />
              <button type="submit" aria-label="Search">
                Search
              </button>
            </div>
          </form>
        </div>
      </header>
      {loading ? <div className="loading">Loading...</div> : switchComponent()}
    </HomepageStyled>
  );
}

const HomepageStyled = styled.div`
  background: linear-gradient(135deg, #f9f9f9, #eaeaea);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  header {
    padding: 2rem;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid #dedede;
    box-sizing: border-box;

    .logo h1 {
      margin: 0;
      font-size: 2.5rem;
      color: #e73827;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      text-align: center;
    }

    .switch-category {
      display: flex;
      justify-content: center;
      gap: 1rem;
      width: 100%;
      max-width: 800px;

      .filter-btn {
        padding: 0.7rem 1.5rem;
        border-radius: 25px;
        font-size: 1.2rem;
        background: linear-gradient(135deg, #fff, #f1f1f1);
        border: 2px solid #f85032;
        color: #f85032;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        &.active {
          background: linear-gradient(135deg, #f85032, #e73827);
          color: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        &:hover {
          background: linear-gradient(135deg, #e73827, #d12c20);
          color: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        i {
          font-size: 1.3rem;
        }
      }
    }

    .search-container {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 800px;
      gap: 1rem;

      .search-form {
        display: flex;
        width: 100%;
        align-items: center;
        gap: 0.5rem;

        .input-control {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 0.5rem;

          input {
            padding: 0.7rem 1rem;
            border: 2px solid #f85032;
            border-radius: 25px;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.3s, box-shadow 0.3s;
            max-width: 400px;
            box-sizing: border-box;

            &:focus {
              border-color: #e73827;
              box-shadow: 0 0 0 3px rgba(231, 56, 39, 0.2);
            }
          }

          button {
            padding: 0.7rem 1.5rem;
            border: none;
            border-radius: 25px;
            background: linear-gradient(135deg, #f85032, #e73827);
            color: #fff;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s, box-shadow 0.3s;
            width: 100%;
            max-width: 400px;
            box-sizing: border-box;

            &:hover {
              background: linear-gradient(135deg, #e73827, #d12c20);
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
          }
        }
      }
    }
  }

  .loading {
    font-size: 1.5rem;
    color: #e73827;
    margin: 2rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    header {
      padding: 1rem;
      display: flex;
      flex-direction: column;
    }

    .logo h1 {
      font-size: 2rem;
    }

    .switch-category {
      flex-direction: column;
      gap: 0.5rem;
    }

    .search-container {
      max-width: 100%;
      flex-direction: column;

      .search-form {
        flex-direction: column;
        .input-control {
          input,
          button {
            width: calc(100% - 2rem);
            max-width: none;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    header {
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .logo h1 {
      font-size: 1.5rem;
    }

    .search-container {
      display: flex;
      flex-direction: column;
      width: 50%;

      .search-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .input-control {
          display: flex;
          flex-direction: column;
          gap: 1rem;

          input {
            width: 100%;
          }
          button {
            font-size: 0.9rem;
            max-width: none;
          }
        }
      }
    }
  }
`;

export default Homepage;
