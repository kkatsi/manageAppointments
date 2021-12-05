import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import PageContent from "../components/PageContent";
import {
  setError,
  setSuccess,
  updateProfileFirebase,
} from "../features/user/userSlice";
import { IoIosCheckmark } from "react-icons/io";
import styled from "styled-components";
import tw from "twin.macro";
import SettingsInput from "../components/SettingsInput";
import SettingsLabel from "../components/SettingsLabel";
import Alert from "../components/Alert";

const CustomForm = styled.form`
  max-width: 400px;
  ${tw`mx-auto w-full flex items-center justify-between`}
`;

export default function ChangeName() {
  const dispatch = useDispatch();
  const success = useSelector((state: RootState) => state.user.isSuccess);
  const error = useSelector((state: RootState) => state.user.isError);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const userPhoto = useSelector(
    (state: RootState) => state.user.value.photoURL
  );
  const userName = useSelector(
    (state: RootState) => state.user.value.displayName
  );
  const handleUpdateProfile = useCallback(
    (e) => {
      e.preventDefault();
      if (nameRef.current?.value !== userName)
        dispatch(
          updateProfileFirebase({
            info: {
              name: nameRef.current?.value || userName,
              photo: userPhoto,
            },
          })
        );
    },
    [dispatch, userPhoto, userName]
  );
  return (
    <PageContent>
      <CustomForm action="" onSubmit={handleUpdateProfile}>
        <div className="flex flex-col justify-between">
          <SettingsLabel>Όνομα</SettingsLabel>
          <SettingsInput
            type="text"
            reference={nameRef}
            defaultValue={userName}
            autoFocus={true}
          />
        </div>
        <button type="submit">
          <IoIosCheckmark size={50} className="text-primary-600" />
        </button>
      </CustomForm>
      <>
        {success && (
          <Alert
            title="Επιτυχημένη αλλαγή ονόματος"
            text="Πλέον εμφανίζεται το νέο σας όνομα στην εφαρμογή."
            onClose={() => dispatch(setSuccess(false))}
          />
        )}
        {error && (
          <Alert
            title="Αποτυχημένη αλλαγή email"
            text="Συνέβησε κάποιο σφάλμα κατά την διαδικασία αλλαγής ονόματος. Παρακαλώ δοκιμάστε ξανά αργότερα."
            onClose={() => dispatch(setError({ status: false, message: "" }))}
          />
        )}
      </>
    </PageContent>
  );
}
