import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import Dashboad from "./pages/Dashboad";

const App: React.FC<{}> = (props) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboad />} />
      <Route path="/register" element={<Register />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);

export default App;
