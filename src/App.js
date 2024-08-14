import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimeItem from "./components/AnimeItem";
import Gallery from "./components/Gallery";
import Homepage from "./components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
