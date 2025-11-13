import Link from "next/link";
import Image from "next/image";
import { HiBookmark } from "react-icons/hi2";
import { useMutation } from "react-query";
import { Exercise } from "@/app/app/app.type";
import { updateFavorite } from "@/app/app/app.api";

interface Props {
  className?: string;
  exercise: Exercise;
}

export const ExerciseListItem = ({ exercise, className }: Props) => {
  const { mutate: update } = useMutation(updateFavorite, {
    onSuccess: (data) => {
      exercise.isFavorite = data.res;
    },
  });

  return (
    <Link href={`/app/library/${exercise._id}`}>
      <div
        className={`flex items-center py-3 sm:py-4 border-lg px-3 rounded-lg border bg-[#0d0d0d] border-[#0d0d0d] ${className}`}
      >
        <div className="flex-shrink-0">
          <div className="relative w-10 h-10">
            <Image
              className="rounded-lg"
              src={exercise.thumbnail}
              alt="Exercise Thumbnail"
              sizes="100%"
              fill={true}
            />
          </div>
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-white truncate dark:text-white">
            {exercise.title}
          </p>
          <p className="text-sm text-white/60 truncate dark:text-white">
            {exercise.viewcount
              ? exercise.viewcount + " Times Watched"
              : "Not seen yet"}
          </p>
        </div>
        <HiBookmark
          onClick={(e) => {
            e.preventDefault();
            update({
              exerciseId: exercise._id,
              isFavorite: !exercise.isFavorite,
            });
          }}
          className={`hover:text-red-700 ${
            exercise.isFavorite ? "text-red-700" : ""
          }`}
        />
      </div>
    </Link>
  );
};
