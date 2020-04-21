import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar.component";
import Header from "./components/header/header.component";
import ContentBox from "./components/contentbox/contentBox.component";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <ContentBox {...props} isSearch />}
        />
        <Route
          path="/saved"
          render={(props) => <ContentBox {...props} isSearch={false} />}
        />
      </Switch>
    </div>
  );
}

export default App;
