import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainContainer from "./containers/main-container/MainContainer";

function App() {
  return (
    <BrowserRouter basename="/">
      <MainContainer></MainContainer>
    </BrowserRouter>
  );
}

export default App;
