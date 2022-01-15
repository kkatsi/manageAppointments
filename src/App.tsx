import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { setCurrentUser, initialState } from "./features/user/userSlice";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import DeleteAlert from "./components/DeleteAlert";
import { useAppDispatch } from "./app/hooks";
import {
  deleteCalendarEvent,
  insertCalendarEvent,
  updateCalendarEvent,
} from "./features/calendar/calendarSlice";
import { setOnline } from "./features/app/appSlice";

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
  const appDispatch = useAppDispatch();

  const postSavedRequests = useCallback(async () => {
    let savedCreates: any[] = [];
    let savedEdits: any[] = [];
    let savedDeletes: any[] = [];

    const savedReqs = JSON.parse(localStorage.getItem("requests") || "");
    if (savedReqs && savedReqs?.length > 0) {
      savedReqs.forEach(async (req) => {
        switch (req.action) {
          case "create":
            savedCreates.push(req);
            break;
          case "edit":
            savedEdits.push(req);
            break;
          case "delete":
            savedDeletes.push(req);
            break;
          default:
            break;
        }

        savedCreates = savedCreates.map((req) => {
          return new Promise<void>((resolve, reject) => {
            appDispatch(
              insertCalendarEvent({
                start: req.start,
                end: req.end,
                description: req.description,
                summary: req.summary,
              })
            ).then(() => resolve());
          });
        });

        savedEdits = savedEdits.map((req) => {
          return new Promise<void>((resolve, reject) => {
            appDispatch(
              updateCalendarEvent({
                id: req.id,
                start: req.start,
                end: req.end,
                description: req.description,
                summary: req.summary,
              })
            ).then(() => resolve());
          });
        });

        savedDeletes = savedDeletes.map((req) => {
          return new Promise<void>((resolve, reject) => {
            appDispatch(
              deleteCalendarEvent({
                id: req.id,
              })
            ).then(() => resolve());
          });
        });

        for (let i = 0; i < savedCreates.length; i++) {
          await savedCreates[i];
        }
        for (let i = 0; i < savedEdits.length; i++) {
          await savedEdits[i];
        }
        for (let i = 0; i < savedDeletes.length; i++) {
          await savedDeletes[i];
        }
        localStorage.removeItem("requests");
      });
    }
  }, [appDispatch]);

  const updateOnlineStatus = useCallback(() => {
    if (navigator.onLine) {
      setOffline(false);
      dispatch(setOnline(true));
      postSavedRequests();
      return;
    }
    setOffline(true);
    dispatch(setOnline(false));
  }, [postSavedRequests, dispatch]);

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
