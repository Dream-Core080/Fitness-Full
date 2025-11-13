import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { User } from "firebase/auth";
import {
  getStorage,
  ref,
  getDownloadURL,
  updateMetadata,
} from "firebase/storage";

import { FirebaseError } from "firebase/app";
import { firebaseConfig } from "@/config";
import { setStorageItem } from "./storage";

export const firebaseapp = initializeApp(firebaseConfig);
export const storage = getStorage();
export const auth = getAuth();

export const firebaseErrorString = (error: FirebaseError) => {
  const res = { message: "" };
  res.message = error.message;
  const errorCode = error.code;
  if (errorCode === "auth/too-many-requests") {
    res.message = "Too many requests. Try again later.";
  } else if (errorCode === "auth/invalid-credential") {
    res.message = "Invalid credentials.";
  } else if (errorCode === "auth/weak-password") {
    res.message = "The password is too weak. Try another password.";
  } else if (errorCode === "auth/email-already-in-use") {
    res.message = "Duplicated email.";
  } else if (errorCode === "auth/invalid-email") {
    res.message = "Invalid email.";
  } else if (errorCode === "auth/user-not-found") {
    res.message = "User not found.";
  } else if (errorCode === "auth/requires-recent-login") {
    res.message = "Please relogin to update password.";
  }

  return res;
};

export async function getFirebaseImage(location: string) {
  try {
    const ImageRef = ref(storage, location);
    await updateMetadata(ImageRef, {
      customMetadata: {
        cacheControl: "public, max-age=300",
      },
    });
    const ImageURL = await getDownloadURL(ImageRef);
    return await ImageURL;
  } catch (e) {
    console.log(e);
    return "";
  }
}

auth.onIdTokenChanged((user) => {
  if(user) {
    setStorageItem("token", user.refreshToken);
  }
});

export const getCurrentUser = () : Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};