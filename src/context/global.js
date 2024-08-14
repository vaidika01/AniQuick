import React, { createContext, useContext, useReducer, useEffect } from "react";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };
    case SEARCH:
      return { ...state, searchResults: action.payload, loading: false };
    case GET_AIRING_ANIME:
      return { ...state, airingAnime: action.payload, loading: false };
    case GET_PICTURES:
      return { ...state, pictures: action.payload, loading: false };
    case "SET_IS_SEARCH":
      return { ...state, isSearch: action.payload };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  // Initial state
  const initialState = {
    popularAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = React.useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      searchAnime(search);
      dispatch({ type: "SET_IS_SEARCH", payload: true });
    } else {
      dispatch({ type: "SET_IS_SEARCH", payload: false });
      alert("Please enter a search term");
    }
  };

  // Fetch popular anime
  const getPopularAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();
    dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
  };

  // Fetch airing anime
  const getAiringAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
    const data = await response.json();
    dispatch({ type: GET_AIRING_ANIME, payload: data.data });
  };

  // Search anime
  const searchAnime = async (anime) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();
    dispatch({ type: SEARCH, payload: data.data });
  };

  // Get anime pictures
  const getAnimePictures = async (id) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/characters/${id}/pictures`
    );
    const data = await response.json();
    dispatch({ type: GET_PICTURES, payload: data.data });
  };

  useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        getPopularAnime,
        getAiringAnime,
        getAnimePictures,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
