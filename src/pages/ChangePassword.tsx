import React, { useCallback, useRef, useState } from "react";
import PageContent from "../components/PageContent";
import {
  logoutFirebase,
  setError,
  setSuccess,
  updatePasswordFirebase,
} from "../features/user/userSlice";
import styled from "styled-components";
import tw from "twin.macro";
import SettingsLabel from "../components/SettingsLabel";
import SettingsInput from "../components/SettingsInput";
import { IoIosCheckmark } from "react-icons/io";
import Alert from "../components/Alert";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";

const CustomForm = styled.form`
  max-width: 400px;
  ${tw`mx-auto w-full flex items-center justify-between`}
`;

export default function ChangePassword() {
  const [passwordLenghtError, setPasswordLengthError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const dispatch = useDispatch();
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const success = useSelector((state: RootState) => state.user.isSuccess);
  const error = useSelector((state: RootState) => state.user.isError);
  const errorMessage = useSelector(
    (state: RootState) => state.user.errorMessage
  );
  const handlePasswordChange = useCallback(
    (e) => {
      e.preventDefault();
      console.log(
        confirmPasswordRef.current?.value,
        passwordRef.current?.value
      );
      if (confirmPasswordRef.current?.value !== passwordRef.current?.value) {
        setPasswordMatchError(true);
        return;
      }
      if (passwordRef.current?.value && passwordRef.current?.value.length < 6) {
        setPasswordLengthError(true);
        return;
      }
      if (confirmPasswordRef.current?.value === passwordRef.current?.value)
        dispatch(updatePasswordFirebase(passwordRef.current?.value || ""));
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    dispatch(logoutFirebase());
    dispatch(setError({ status: false, message: "" }));
  }, [dispatch]);
  return (
    <PageContent>
      <CustomForm action="" onSubmit={handlePasswordChange}>
        <div className="flex flex-col justify-between">
          <SettingsLabel>Νέος κωδικός πρόσβασης</SettingsLabel>
          <SettingsInput
            type="password"
            reference={passwordRef}
            autoFocus={true}
          />
          <br />
          <SettingsLabel>Επιβεβαίωση κωδικού πρόσβασης</SettingsLabel>
          <SettingsInput
            type="password"
            reference={confirmPasswordRef}
            autoFocus={false}
          />
        </div>
        <button type="submit">
          <IoIosCheckmark size={50} className="text-primary-600" />
        </button>
      </CustomForm>
      <>
        {passwordMatchError && (
          <Alert
            text="Ελέγξτε τους δύο κωδικούς και βεβαιωθείτε πως είναι ακριβώς ίδιοι."
            title="Οι δύο κωδικοί που εισάγατε δεν ταιριάζουν"
            onClose={() => setPasswordMatchError(false)}
          />
        )}
        {passwordLenghtError && (
          <Alert
            title="Ο κωδικός σας πρέπει να αποτελείτε από τουλάχιστον 6 χαρακτήρες"
            text="Ελέγξτε το μέγεθος του κωδικού που πληκτρολογήσατε και βεβαιωθείτε πως περιέχει τον ελάχιστο αριθμό χαρακτήρων."
            onClose={() => setPasswordLengthError(false)}
          />
        )}
        {success && (
          <Alert
            title="Επιτυχημένη αλλαγή κωδικού πρόσβασης"
            text="Πλέον μπορείτε να χρησιμοποιήσετε τον νέο κωδικό που ορίσατε για την είσοδό σας στην εφαρμογή."
            onClose={() => dispatch(setSuccess(false))}
          />
        )}
        {error && (
          <Alert
            title="Αποτυχημένη αλλαγή κωδικού πρόσβασης"
            text={
              errorMessage === "Firebase: Error (auth/requires-recent-login)."
                ? "Η τελευταία φορά που συνδεθήκατε ήταν αρκετό καιρό πριν. Για λόγους ασφαλείας θα πρέπει να ξανασυνδεθείτε στην εφαρμογή παρέχοντας τα στοιχεία σας."
                : "Συνέβησε κάποιο σφάλμα κατά την διαδικασία αλλαγής κωδικού πρόσβασης. Παρακαλώ δοκιμάστε ξανά αργότερα."
            }
            onClose={() => dispatch(setError({ status: false, message: "" }))}
            secondButtonText={
              errorMessage === "Firebase: Error (auth/requires-recent-login)."
                ? "Αποσύνδεση"
                : ""
            }
            onSecondButtonClose={handleLogout}
          />
        )}
      </>
    </PageContent>
  );
}
