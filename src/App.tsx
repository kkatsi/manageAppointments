import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setCurrentUser, initialState } from "./features/user/userSlice";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import DeleteAlert from "./components/DeleteAlert";

function App() {
  const dispatch = useDispatch();

  const updateSigninStatus = useCallback(
    (isSignedIn: boolean) => {
      const user = gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile();
      console.log(user, isSignedIn);
      if (isSignedIn && user) {
        dispatch(
          setCurrentUser({
            displayName: user.getName(),
            email: user.getEmail(),
            photoURL: user.getImageUrl(),
          })
        );
      } else dispatch(setCurrentUser(initialState.value));
    },
    [dispatch]
  );

  const initGoogleSignin = useCallback(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: process.env.REACT_APP_GAPI_API_KEY,
          clientId: process.env.REACT_APP_GAPI_CLIENT_ID,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: "https://www.googleapis.com/auth/calendar",
        })
        .then(() => {
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          gapi.client.load("calendar", "v3", async () => {
            console.log("calendar loaded");
          });
        });
    });
  }, [updateSigninStatus]);

  const insertGapiScript = useCallback(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => {
      initGoogleSignin();
    };
    document.body.appendChild(script);
  }, [initGoogleSignin]);

  useEffect(() => {
    insertGapiScript();
  }, [insertGapiScript]);

  const [offline, setOffline] = useState(false);

  const updateOnlineStatus = useCallback(() => {
    var offline = navigator.onLine ? false : true;
    setOffline(offline);
  }, []);

  useEffect(() => {
    window.addEventListener("offline", updateOnlineStatus);
    window.addEventListener("online", updateOnlineStatus);
    return () => {
      window.removeEventListener("offline", updateOnlineStatus);
      window.removeEventListener("online", updateOnlineStatus);
    };
  }, [updateOnlineStatus]);

  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
        {/* <Route
        path="/protected"
        element={
          <PrivateRoute>
            <ProtedctedScreen />
          </PrivateRoute>
        }
      /> */}

        {/* <Route path="invoices" element={<Invoices />} /> */}
      </Routes>
      {offline && <DeleteAlert />}
    </>
  );
}

export default App;
