import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import { useAppContext } from "./context/appContext";
import AlertGlobal from "./components/AlertGlobal";
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
} from "./pages/dashboard";
import Loading from "./components/Loading";
import ProtectedRoute from "./pages/ProtectedRoute";

const App: React.FC<{}> = (props) => {
  const { showAlert, isLoading } = useAppContext();

  return (
    <React.Fragment>
      {showAlert && <AlertGlobal />}
      {/* {isLoading && <Loading />} */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
                {/* only available if certain conditions are met */}
              </ProtectedRoute>
            }
          >
            {/* nested structure with relative path*/}
            {/* index => default main page within outlet */}
            <Route index element={<Stats />} />
            <Route path="add-job" element={<AddJob />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
