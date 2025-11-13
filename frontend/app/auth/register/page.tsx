"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";

import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useFormik } from "formik";

import { registerSchema } from "@/utils/yup";
import { SIGNUP_LOGO_PATH } from "@/utils/constants/image-paths";
import { Pathnames } from "@/utils/constants/pathnames";
import { Field } from "@/components/ui/Field";
import { Checkbox } from "@/components/ui/Checkbox";
import TermDialog from "@/components/TermsDialog";

import { RegisterPayload } from "../auth.type";
import { register } from "../auth.api";

export default function Page() {
  const router = useRouter();

  const [agreePolicy, setAgreePolicy] = useState(false);
  const [openTermModal, setOpenTermModal] = useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: register,
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repeatPassword: "",
    } as RegisterPayload,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          router.push(Pathnames.LOGIN)
        },
        onError: (data: any) => {
          toast.error(data.message);
        },
      });
    },
  });

  const handleTermModal = () => setOpenTermModal(!openTermModal);

  return (
    <main>
      <div className="relative bg-black rounded-3xl p-4 md:p-6 w-full md:w-[430px] opacity-75">
        <div className="flex justify-center">
          <Image src={SIGNUP_LOGO_PATH} alt="SignUp Logo" />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-3 md:gap-6 mt-3 md:my-6"
        >
          <Field
            label="First Name"
            formik={formik}
            name="firstname"
            placeholder="First Name"
            type="text"
          />
          <Field
            label="Last Name"
            formik={formik}
            name="lastname"
            placeholder="Last Name"
            type="text"
          />
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
          <Field
            label="Confirm Password"
            formik={formik}
            name="repeatPassword"
            placeholder="Confirm Password"
            type="password"
          />
          <div className="flex">
            <Checkbox
              isChecked={agreePolicy}
              onToggle={() => setAgreePolicy(!agreePolicy)}
            />
            <div>
              I agree to{" "}
              <label
                className="text-customRed cursor-pointer"
                onClick={handleTermModal}
              >
                Terms & Conditions
              </label>
              .
            </div>
          </div>
          <button
            type="submit"
            className="primaryBtn w-full"
            disabled={isLoading || !agreePolicy}
          >
            Get Started Now
          </button>
        </form>

        <Link
          href={Pathnames.LOGIN}
          className="text-sm leading-sm text-center block"
        >
          <label className="text-customRed cursor-pointer">Sign in</label>{" "}
          instead.
        </Link>
      </div>
      <TermDialog openModal={openTermModal} handleModal={handleTermModal} />
    </main>
  );
}
