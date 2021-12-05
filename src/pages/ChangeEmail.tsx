import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import PageContent from "../components/PageContent";
import {
  logoutFirebase,
  setError,
  setSuccess,
  updateEmailFirebase,
} from "../features/user/userSlice";
import styled from "styled-components";
import tw from "twin.macro";
import SettingsLabel from "../components/SettingsLabel";
import SettingsInput from "../components/SettingsInput";
import { IoIosCheckmark } from "react-icons/io";
import Alert from "../components/Alert";

const CustomForm = styled.form`
  max-width: 400px;
  ${tw`mx-auto w-full flex items-center justify-between`}
`;

export default function ChangeEmail() {
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.user.value.email);
  const success = useSelector((state: RootState) => state.user.isSuccess);
  const error = useSelector((state: RootState) => state.user.isError);
  const errorMessage = useSelector(
    (state: RootState) => state.user.errorMessage
  );
  const emailRef = useRef<HTMLInputElement | null>(null);
  const handleEmailChange = useCallback(
    (e) => {
      e.preventDefault();
      if (emailRef.current?.value !== userEmail)
        dispatch(updateEmailFirebase(emailRef.current?.value || ""));
    },
    [dispatch, userEmail]
  );
  return (
    <PageContent>
      <CustomForm action="" onSubmit={handleEmailChange}>
        <div className="flex flex-col justify-between">
          <SettingsLabel>Email</SettingsLabel>
          <SettingsInput
            type="email"
            reference={emailRef}
            defaultValue={userEmail}
            autoFocus={!success && !error ? true : false}
          />
        </div>
        <button type="submit">
          <IoIosCheckmark size={50} className="text-primary-600" />
        </button>
      </CustomForm>
      <>
        {success && (
          <Alert
            title="Επιτυχημένη αλλαγή email"
            text="Πλέον μπορείτε να χρησιμοποιήσετε το νέο email που ορίσατε για να συνδεθείτε στην εφαρμογή."
            onClose={() => dispatch(setSuccess(false))}
          />
        )}
        {error && (
          <Alert
            title="Αποτυχημένη αλλαγή email"
            text={
              errorMessage === "Firebase: Error (auth/requires-recent-login)."
                ? "Η τελευταία φορά που συνδεθήκατε ήταν αρκετό καιρό πριν. Για λόγους ασφαλείας θα πρέπει να ξανασυνδεθείτε στην εφαρμογή παρέχοντας τα στοιχεία σας."
                : "Συνέβησε κάποιο σφάλμα κατά την διαδικασία αλλαγής email. Παρακαλώ δοκιμάστε ξανά αργότερα."
            }
            onClose={() => dispatch(setError({ status: false, message: "" }))}
            secondButtonText={
              errorMessage === "Firebase: Error (auth/requires-recent-login)."
                ? "Αποσύνδεση"
                : ""
            }
            onSecondButtonClose={() => {
              dispatch(logoutFirebase());
              dispatch(setError({ status: false, message: "" }));
            }}
          />
        )}
      </>
    </PageContent>
  );
}
