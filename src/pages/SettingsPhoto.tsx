import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { updateProfileFirebase } from "../features/user/userSlice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import styled from "styled-components";
import tw from "twin.macro";
import LoadingScreen from "../components/LoadingScreen";

const CustomImage = styled.img`
  object-fit: cover;
  object-position: center;
  ${tw`rounded-full w-36 h-36 border-4 border-primary-500 mb-7`}
`;

export default function SettingsPhoto() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const photoURL = useSelector((state: RootState) => state.user.value.photoURL);
  const userName = useSelector(
    (state: RootState) => state.user.value.displayName
  );
  const photoRef = useRef<HTMLInputElement | null>(null);

  const updateProfile = useCallback(
    (url: string) => {
      dispatch(
        updateProfileFirebase({
          info: {
            name: userName,
            photo: url,
          },
        })
      );
    },
    [dispatch, userName]
  );

  const storageRef = ref(storage, "photo-profile/profile.jpg");

  const uploadPhoto = useCallback(
    async (file: Blob) => {
      return await uploadBytes(storageRef, file);
    },
    [storageRef]
  );

  const handlePhotoChange = useCallback(() => {
    setLoading(true);
    uploadPhoto(
      (photoRef.current?.files && photoRef.current?.files[0]) || new Blob()
    ).then((snapshot) =>
      getDownloadURL(snapshot.ref).then((url) => updateProfile(url))
    );
  }, [uploadPhoto, updateProfile]);

  useEffect(() => {
    setLoading(false);
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <>
      <div className="mx-auto">
        <label htmlFor="profile-photo" className="rounded-full">
          <CustomImage src={photoURL} alt="profile" />
        </label>
        <input
          ref={photoRef}
          type="file"
          id="profile-photo"
          onChange={() => dispatch(handlePhotoChange)}
          style={{ display: "none" }}
        />
      </div>
      {loading && <LoadingScreen />}
    </>
  );
}
