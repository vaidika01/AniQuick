import styled from "styled-components";

export const AnimeGridStyled = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2rem 1rem;
  background-color: #f8f9fa;

  .anime-grid {
    width: 100%;
    max-width: 1200px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
    background-color: #fff;
    border-top: 3px solid #e5e7eb;

    a {
      display: block;
      border-radius: 8px;
      border: 3px solid #e5e7eb;
      overflow: hidden;
    }

    a img {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 8px;
    }
  }
`;
