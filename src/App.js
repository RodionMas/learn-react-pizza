import Header from "./Components/Header/Header";
import "./scss/app.scss";
import React from "react";

import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Card from "./Pages/Card";
export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route index element={<Home />} />
            {/* Если ничего не найдено отобрази NotFound */}
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Card />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
