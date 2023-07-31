import React from "react";
import Header from "./components/Header";
import MainBody from "./components/MainBody";

const App = () => {
  return (
    <div className="container d-flex flex-column p-2">
      <Header />
      <MainBody />
    </div>
  );
};

export default App;
