"use client";

import { useRouter } from "next-nprogress-bar";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import { Pathnames } from "@/utils/constants/pathnames";
import { Field } from "@/components/ui/Field";
import { forgotPassword } from "../auth.api";

export default function Page() {
  const router = useRouter();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: forgotPassword,
  });

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: ({ email }) => {
      mutate(email, {
        onSuccess: () => {
          router.push(Pathnames.LOGIN);
        },
      });
    },
  });

  return (
    <main>
      <div className="relative bg-black rounded-3xl p-6 w-[430px] mb-20 opacity-75">
        <h1 className="text-white text-[24px] lg:text-lg lg:leading-lg mb-4 font-bold">
          Forgot password?
        </h1>
        <>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 md:gap-6 my-3 md:my-6"
          >
            <Field
              required
              label="Email"
              formik={formik}
              placeholder="Your Email Address"
              name="email"
              type="email"
            />
            <button
              type="submit"
              className="primaryBtn w-full"
              disabled={isLoading}
            >
              {isSuccess ? "Mail sent successfully!" : "Send reset mail"}
            </button>
          </form>
        </>
      </div>
    </main>
  );
}
