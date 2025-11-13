"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next-nprogress-bar';

import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import { useAuthStore } from "@/stores/auth";
import { sendEmailVerification } from "firebase/auth";
import { auth, firebaseErrorString } from "@/utils/firebase-util";
import { SIGNIN_LOGO_PATH } from "@/utils/constants/image-paths";
import { Pathnames } from "@/utils/constants/pathnames";
import { loginSchema } from "@/utils/yup";
import ResendDialog from "@/components/ResendDialog";
import { Field } from "@/components/ui/Field";
import { LoginPayload } from "../auth.type";
import { login } from "../auth.api";

export default function Page() {
  const router = useRouter();
  const { setUser, setIsLogged, isLogged } = useAuthStore();

  const [resendModal, SetResendModal] = useState(false);
  const handleResendModal = () => SetResendModal(!resendModal);

  useEffect(() => {
    if (isLogged) {
      router.replace(Pathnames.DASHBOARD);
    }
  }, [isLogged, router]);

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" } as LoginPayload,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (user) => {
          setUser(user);
          setIsLogged(true);
          if (user.experience) router.push(Pathnames.DASHBOARD);
          else router.push(Pathnames.QUIZ);
        },
        onError: (data: any) => {
          if (data.message === "Email is not verified yet.") {
            SetResendModal(true);
          } else {
            toast.error(data.message);
          }
        },
      });
    },
  });

  return (
    <main>
      <div className="relative bg-black rounded-3xl p-6 w-[430px] mb-20 opacity-75">
        <div className="flex justify-center">
          <Image src={SIGNIN_LOGO_PATH} alt="SignIn Logo" />
        </div>
        {
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 md:gap-6 my-3 md:my-6"
          >
            <Field
              label="Email"
              formik={formik}
              name="email"
              placeholder="Email Address"
              type="email"
            />
            <Field
              label="Password"
              formik={formik}
              name="password"
              placeholder="Your Password"
              type="password"
            />
            <div className="flex flex-col gap-2">
              <Link
                href={Pathnames.FORGOT_PASSWORD}
                className="text-sm leading-sm text-right"
              >
                <label className="text-customRed cursor-pointer">Forgot</label>{" "}
                password?
              </Link>
            </div>

            <button
              type="submit"
              className="primaryBtn w-full"
              disabled={isLoading}
            >
              Sign in Now
            </button>
            <Link
              href={Pathnames.REGISTER}
              className="text-sm leading-sm text-center font-medium"
            >
              <label className="text-customRed cursor-pointer">
                Create an account
              </label>{" "}
              instead?
            </Link>
          </form>
        }
      </div>
      <ResendDialog
        openModal={resendModal}
        handleModal={handleResendModal}
        onConfirm={() => {
          sendEmailVerification(auth.currentUser!)
            .then(() => {
              toast.success("Verification email is sent again.");
              handleResendModal();
            })
            .catch((error) => {
              toast.error(firebaseErrorString(error).message);
            });
        }}
      />
    </main>
  );
}
