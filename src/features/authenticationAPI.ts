import {
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { gapi } from "gapi-script";
import { auth } from "../firebase";

// export function signup(email: string, password: string) {
//   return auth.createUserWithEmailAndPassword(email, password);
// }

// export function sendEmailVerification(user: FirebaseUser) {
//   return user.sendEmailVerification();
// }

export async function gapiLog() {
  const googleAuth = gapi.auth2.getAuthInstance();
  const googleUser = await googleAuth.signIn();
  return googleUser;
}

export async function gapiLogO() {
  const googleAuth = gapi.auth2.getAuthInstance();
  const googleUser = await googleAuth.signOut();
  return googleUser;
}

export function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export async function updateProf(info: { name: string; photo: string }) {
  if (auth.currentUser) {
    return await updateProfile(auth.currentUser, {
      displayName: info.name,
      photoURL: info.photo,
    })
      .then(() => {
        return {
          displayName: info.name,
          photoURL: info.photo,
          status: true,
        };
      })
      .catch(() => {
        return {
          displayName: auth.currentUser?.displayName,
          photoURL: auth.currentUser?.photoURL,
          status: false,
        };
      });
  } else return { displayName: "", photoURL: "", status: false };
}

export async function updateMail(email: string) {
  if (auth.currentUser) {
    return await updateEmail(auth.currentUser, email)
      .then(() => {
        return { email: email, status: true, message: "" };
      })
      .catch((error) => {
        return {
          email: auth.currentUser?.email,
          status: false,
          message: error.message,
        };
      });
  } else return { email: "", status: false, message: "" };
}

export async function updatePass(password: string) {
  if (auth.currentUser) {
    return await updatePassword(auth.currentUser, password)
      .then(() => {
        return { status: true, message: "" };
      })
      .catch((error) => {
        console.log(error.message);
        return { status: false, message: error.message };
      });
  }
}
