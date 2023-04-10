import React from "react";
import Pages from "./pages/Pages";
import Navigation from "./components/Navigation";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
