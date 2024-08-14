import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/global";

function Gallery() {
  const { getAnimePictures, pictures } = useGlobalContext();
  const { id } = useParams();

  const [index, setIndex] = useState(0);

  const handleImageClick = (i) => {
    setIndex(i);
  };

  useEffect(() => {
    getAnimePictures(id);
  }, []);

  return (
    <GalleryStyled>
      <div className="back">
        <Link to="/">
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </Link>
      </div>
      <div className="big-image">
        <img src={pictures[index]?.jpg.image_url} alt="" />
      </div>
      <div className="small-images">
        {pictures?.map((picture, i) => {
          return (
            <div
              className="image-con"
              onClick={() => {
                handleImageClick(i);
              }}
              key={i}
            >
              <img
                src={picture?.jpg.image_url}
                style={{
                  border:
                    i === index ? "3px solid #27AE60" : "3px solid #e5e7eb",
                  filter: i === index ? "grayscale(0)" : "grayscale(60%)",
                  transform: i === index ? "scale(1.1)" : "scale(1)",
                  transition: "all .3s ease-in-out",
                }}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </GalleryStyled>
  );
}

const GalleryStyled = styled.div`
  background-color: #f7f7f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;

  .back {
    position: absolute;
    top: 2rem;
    left: 2rem;
    a {
      font-weight: 600;
      text-decoration: none;
      color: #e74c3c;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: color 0.3s;

      &:hover {
        color: #c0392b;
      }

      i {
        font-size: 1.2rem;
      }
    }
  }

  .big-image {
    display: inline-block;
    padding: 1rem;
    margin: 2rem 0;
    background-color: #fff;
    border-radius: 10px;
    border: 4px solid #e0e0e0;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    img {
      width: 100%;
      max-width: 600px;
      height: auto;
      border-radius: 8px;
      object-fit: cover;
    }
  }

  .small-images {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 100%;
    max-width: 900px;
    padding: 1rem;
    background-color: #fff;
    border-radius: 10px;
    border: 4px solid #e0e0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    img {
      width: 100%;
      max-width: 80px;
      height: 80px;
      object-fit: cover;
      cursor: pointer;
      border-radius: 5px;
      border: 3px solid #e5e7eb;
      transition: all 0.3s ease-in-out;
    }

    .image-con {
      border-radius: 5px;
      overflow: hidden;
      transition: border 0.3s, transform 0.3s;
    }
  }

  @media (max-width: 768px) {
    .back {
      top: 1rem;
      left: 1rem;
      a {
        font-size: 0.9rem;
        gap: 0.3rem;
      }
    }

    .big-image {
      padding: 1rem;
      margin: 1.5rem 0;
    }

    .small-images {
      max-width: 100%;
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .big-image img {
      max-width: 100%;
      height: auto;
    }

    .small-images {
      gap: 0.3rem;
    }
  }
`;

export default Gallery;
