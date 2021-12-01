import {
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

// export function signup(email: string, password: string) {
//   return auth.createUserWithEmailAndPassword(email, password);
// }

// export function sendEmailVerification(user: FirebaseUser) {
//   return user.sendEmailVerification();
// }

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
        };
      })
      .catch(() => {
        return {
          displayName: auth.currentUser?.displayName,
          photoURL: auth.currentUser?.photoURL,
        };
      });
  } else return { displayName: "", photoURL: "" };
}
