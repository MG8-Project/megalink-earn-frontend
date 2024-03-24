import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />}></Route>
        {/* <Route
          path="error"
          element={
            <div style={{ fontSize: "16px" }}>404 없는 페이지입니다.</div>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
