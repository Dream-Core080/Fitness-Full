"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";

import { useAuthStore } from "@/stores/auth";
import { updateUserSchema } from "@/utils/yup";
import { PROFILE_PATH } from "@/utils/constants/image-paths";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { UpdateUserPayload } from "@/app/auth/auth.type";
import { updateUser } from "@/app/auth/auth.api";
import { fetchQuizzes } from "@/app/app/app.api";
import { FaEdit } from "react-icons/fa";

export default function Page() {
  const { user, setUser } = useAuthStore();
  const [experienceOptions, setExperienceOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const { data: quizzes } = useQuery("get-quizzes", fetchQuizzes);

  const avatarInputRef = useRef<any>()

  useEffect(() => {
    if (quizzes) {
      const options = [
        ...quizzes.map((item) => ({
          label: item.title,
          value: item._id,
        })),
      ];
      setExperienceOptions(options);
    }
  }, [quizzes]);
  const { mutate, isLoading } = useMutation({
    mutationFn: updateUser,
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      note: user?.note,
      experience: user?.experience
    } as UpdateUserPayload,
    validationSchema: updateUserSchema,
    onSubmit: (values) => {
      if (!user?.id) return;
      mutate(
        { userId: user.id, body: values },
        {
          onSuccess: (data) => {
            setUser({
              ...user,
              ...data,
            });
          },
          onError: (data: any) => {
            toast.error(data.message);
          },
        }
      );
    },
  });

  const [pfpFile, setPfpFile] = useState<string>();
  const handleChange = (e: any) => {
    setPfpFile(URL.createObjectURL(e.target.files[0]));
    formik.setFieldValue("avatar", e.target.files[0]);
  };

  const handleClickFileButton = () => {
    avatarInputRef.current.click()
  }

  return (
    <main>
      <div className="flex flex-col justify-center place-items-center mt-16">
        <div className="relative w-48 h-48">
          <Image
            className="rounded-full"
            src={
              pfpFile
                ? pfpFile
                : user?.avatarUrl
                ? user.avatarUrl
                : PROFILE_PATH
            }
            onClick={handleClickFileButton}
            fill={true}
            alt="Profile Picture"
          />
          <div onClick={handleClickFileButton} className="edit-icon absolute bottom-0 right-6 bg-[#0d0d0d] p-1 rounded-full border-2 border-gray-300 cursor-pointer">
            <FaEdit color="white"/>
          </div>
        </div>
        <form
          className="flex flex-col gap-3 w-96 md:gap-6 md:my-6"
          onSubmit={formik.handleSubmit}
        >
          <div className={`form-group valid`}>
            <input
              type="file"
              name="avatar"
              hidden
              ref={avatarInputRef}
              placeholder="Avatar"
              onChange={handleChange}
            />
            {/* <button onClick={handleClickFileButton}>test</button> */}
          </div>
          <Field
            label="First Name"
            formik={formik}
            name="firstname"
            placeholder="First Name"
          />
          <Field
            label="Last Name"
            formik={formik}
            name="lastname"
            placeholder="Last Name"
          />
          <Textarea label="About me" formik={formik} name="note" />
          <Field
            label="Password"
            formik={formik}
            name="password"
            placeholder="New Password"
            type="password"
          />
          <Field
            label="Confirm Password"
            formik={formik}
            name="repeatPassword"
            placeholder="Confirm Password"
            type="password"
          />
          <Select
            instanceId="React Select"
            formik={formik}
            label="Experience"
            name="experience"
            options={experienceOptions}
            value={
              experienceOptions?.find(
                (c) => c.label === formik.values.experience
              ) || ""
            }
            onChange={(value: any) =>
              formik.setFieldValue("experience", value.label)
            }
          />         
          <button type="submit" className="primaryBtn" disabled={isLoading}>
            Update
          </button>
        </form>
      </div>
    </main>
  );
}
