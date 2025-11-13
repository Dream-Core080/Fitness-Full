"use client";

import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";

import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import { useAuthStore } from "@/stores/auth";
import { updateQuiz } from "@/app/auth/auth.api";
import { fetchQuizzes } from "@/app/app/app.api";
import { QuizPayload } from "@/app/auth/auth.type";
import { Select } from "@/components/ui/Select";
import { Pathnames } from "@/utils/constants/pathnames";
import { updateExperienceSchema } from "@/utils/yup";

export default function Page() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [experienceOptions, setExperienceOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const { data: quizzes } = useQuery("get-quizzes", fetchQuizzes);
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
    mutationFn: updateQuiz,
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      experience: user?.experience,
    } as QuizPayload,
    validationSchema: updateExperienceSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: (data) => {
          setUser({
            ...user,
            ...data,
          });
          router.push(Pathnames.DASHBOARD);
        },
        onError: (data: any) => {
          console.log(data.message);
        },
      });
    },
  });

  return (
    <main>
      <div className="relative bg-black rounded-3xl p-6 mb-20 opacity-75">
        <h1 className="text-white text-[24px] lg:text-lg lg:leading-lg mb-4 font-bold">
          Tell us about your goal.
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-3 md:gap-6 my-3 md:my-6"
        >
          <Select
            instanceId="React Select"
            formik={formik}
            label=""
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
            Go
          </button>
        </form>
      </div>
    </main>
  );
}
