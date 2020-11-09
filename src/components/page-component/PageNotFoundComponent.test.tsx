import React from "react";
import ReactDOM from "react-dom";
import PageNotFoundComponent from "./PageNotFoundComponent";

it("renders PageNotFoundComponent without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PageNotFoundComponent />, div);
});
