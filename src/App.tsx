import React, { useEffect } from "react";
import "./App.css";
// import tw from "twin.macro";
// import styled from "styled-components";
import { useDispatch } from "react-redux";
// import { RootState } from "./app/store";
import { setCurrentUser, initialState } from "./features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

// const Test = styled.div`
//   ${tw`text-red-500`}
// `;

// const Image = styled.img`
//   object-fit: cover;
//   object-position: center;
//   ${tw`rounded-full w-20 h-20 border-2 border-pink-600 mx-auto`}
// `;

function App() {
  // const user = useSelector((state: RootState) => state.user.value);
  // const loading = useSelector((state: RootState) => state.user.isLoading);
  const dispatch = useDispatch();
  // const emailRef = useRef<HTMLInputElement | null>(null);
  // const passwordRef = useRef<HTMLInputElement | null>(null);
  // const nameRef = useRef<HTMLInputElement | null>(null);
  // const photoRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) dispatch(setCurrentUser(user));
      else dispatch(setCurrentUser(initialState.value));
    });

    return unsubscribe;
  }, [dispatch]);

  // const handleUpdateProfile = useCallback(

  //   (e, currentUser) => {
  //     console.log(currentUser);
  //     e.preventDefault();
  //     dispatch(
  //       updateProfileFirebase({
  //         info: {
  //           name: nameRef.current?.value || "",
  //           photo: photoRef.current?.value || "",
  //         },
  //       })
  //     );
  //   },
  //   [dispatch]
  // );
  return (
    <Routes>
      <Route
        path="//*"
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
  );
}

export default App;
