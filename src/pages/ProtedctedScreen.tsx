import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logoutFirebase } from "../features/user/userSlice";

export default function ProtedctedScreen() {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logoutFirebase());
  }, [dispatch]);
  return (
    <div>
      Protected
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
