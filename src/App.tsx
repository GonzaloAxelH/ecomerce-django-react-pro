import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Error404 from "./containers/errors/Error404";
import Activate from "./containers/Auth/Activate";
import Login from "./containers/Auth/Login";
import Signup from "./containers/Auth/Signup";

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="*" element={<Error404 />} />

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activate/:uid/:token" element={<Activate />} />
      </Routes>
    </Provider>
  );
};

export default App;
