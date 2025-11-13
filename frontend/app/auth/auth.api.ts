import { toast } from "react-toastify";
import {
  LoginPayload,
  QuizPayload,
  RegisterPayload,
  UpdateUserPayload,
  User,
} from "./auth.type";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, getCurrentUser, storage } from "@/utils/firebase-util";
import { firebaseErrorString } from "@/utils/firebase-util";
import { setStorageItem } from "@/utils/storage";
import { apiCall } from "@/utils/api";

export const login = async (body: LoginPayload): Promise<any> => {
  try {
    const data = await signInWithEmailAndPassword(
      auth,
      body.email,
      body.password
    ).catch(function (error) {
      return Promise.reject(firebaseErrorString(error));
    });
    if (!data.user.emailVerified) {
      return Promise.reject({ message: "Email is not verified yet." });
    }
    setStorageItem("token", data.user.refreshToken);
    const user = await fetchMe();
    return Promise.resolve(user);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const register = async (body: RegisterPayload): Promise<any> => {
  try {
    await createUserWithEmailAndPassword(auth, body.email, body.password)
      .then(async (data) => {
        const request = await apiCall();
        await request({
          url: "/users/register_user",
          data: body,
          method: "POST",
        });
        toast.success(
          "You have successfully registered! Verification eamil is sent to your email address."
        );
        sendEmailVerification(auth.currentUser!);
        return Promise.resolve(data);
      })
      .catch(function (err) {
        return Promise.reject(firebaseErrorString(err));
      });
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateUser = async ({
  userId,
  body,
}: {
  userId: string;
  body: UpdateUserPayload;
}): Promise<any> => {
  try {
    let avatarUrl = undefined;
    if (body.avatar) {
      const storageRef = ref(storage, "avatars/" + userId);
      await uploadBytes(storageRef, body.avatar);
      avatarUrl = await getDownloadURL(storageRef);
      delete body.avatar;
    }
    if (body.password) {
      const user = await getCurrentUser();
      if (user) {
        await updatePassword(user, body.password).catch((err) => {
          return Promise.reject(firebaseErrorString(err));
        });
      }
    }
    delete body.password;
    delete body.repeatPassword;
    const request = await apiCall();
    if (avatarUrl) {
      await request({
        url: "/users/update_user_avatar",
        method: "POST",
        data: { avatarUrl },
      });
    }
    await request({
      url: "/users/update_user_profile",
      method: "POST",
      data: body,
    });
    toast.success("Updated successfully.");
    return Promise.resolve({
      ...body,
      avatarUrl,
    });
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateQuiz = async (body: QuizPayload): Promise<any> => {
  try {
    const request = await apiCall();
    await request({
      url: "/users/update_user_experience",
      method: "POST",
      data: body,
    });
    toast.success("Updated successfully.");
    return Promise.resolve(body);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
      .then((data) => {
        toast.success("Password Reset Email Sent!");
        return Promise.resolve(data);
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchMe = async (): Promise<User> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/users/get_user_profile",
      method: "GET",
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};
