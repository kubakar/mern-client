import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import Dashboad from "./pages/Dashboad";
import { useAppContext } from "./context/appContext";
import AlertGlobal from "./components/AlertGlobal";
import Loading from "./components/Loading";

const App: React.FC<{}> = (props) => {
  const { showAlert, isLoading } = useAppContext();

  return (
    <React.Fragment>
      {showAlert && <AlertGlobal />}
      {/* {isLoading && <Loading />} */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboad />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
