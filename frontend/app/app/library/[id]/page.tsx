"use client";

import Link from "next/link";
import Image from "next/image";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import ReactPlayer from "react-player/vimeo";

import {
  HiChevronLeft,
  HiOutlineBookmark,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { LuFileEdit } from "react-icons/lu";
import Carousel from "react-multi-carousel";
import { Button } from "@material-tailwind/react";
import Vimeo from "@u-wave/react-vimeo";
import localFont from 'next/font/local'
const myFont = localFont({ src: '../../../../public/fonts/BebasNeue-Regular.ttf' });
import { ICON1_PATH } from "@/utils/constants/image-paths";
import { Pathnames } from "@/utils/constants/pathnames";
import {
  SliderButtonGroup,
  small_carousel_responsive,
} from "@/components/ui/Carousel";
import { ExerciseListItem } from "@/components/ExerciseListItem";
import NoteDialog from "@/components/NoteDialog";
import QuickGuide from "@/components/QuickGuide";
import CustomVimeoPlayer from "@/components/ui/CustomVimeoPlayer";
import {
  ExercisesGroupSkeleton,
  VimeoCarouselSkeleton,
  VimeoCategorySkeleton,
  VimeoSkeleton,
  VimeoTitleSkeleton,
} from "@/components/skeleton";
import { fetchExerciseDetail, fetchRecommended, updateFavorite, updateNote } from "../../app.api";
import { useFilterStore } from "@/stores/filter";


export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const { setSearchCategoryOption } = useFilterStore()
  const {
    data: exerciseDetail,
    refetch,
    isRefetching,
  } = useQuery("get-exercise-detail", () => {
    if (id) return fetchExerciseDetail(id);
  });
  const { data: exerciseRecommended } = useQuery("exercise-recommended", () =>
    fetchRecommended({ page: 1, perPage: 5 })
  );
  const { mutate: update } = useMutation(updateNote, {
    onSuccess: () => {
      setOpenNoteModal(false);
    },
  });
  const { mutate: updateFav } = useMutation(updateFavorite, {
    onSuccess: (data) => {
      if (exerciseDetail) exerciseDetail.isFavorite = data.res;
    },
  });


  useEffect(() => {
    if (id) refetch();
  }, [id, refetch]);

  const handleNoteModal = useCallback(() => {
    setOpenNoteModal(!openNoteModal);
  }, [openNoteModal, setOpenNoteModal]);
  const noteChange = useCallback(
    (note: string) => {
      if (id) update({ exerciseId: id, note });
    },
    [id, update]
  );
  const isLoaded = useMemo(
    () => exerciseDetail && !isRefetching,
    [exerciseDetail, isRefetching]
  );
  return (
    <main>
      <div className="p-32 pt-16">
        <div className="flex justify-between text-gray-300 mb-10">
          <Link href={Pathnames.LIBRARY} className="flex">
            <HiChevronLeft className="mt-1 mr-2" />
            <span className="text-[#F9D0D0]">Back to Library</span>
          </Link>
          <div className="flex text-[#868686]">
            <HiOutlineBookmark
              onClick={() => {
                updateFav({
                  exerciseId: id,
                  isFavorite: !exerciseDetail?.isFavorite,
                });
              }}
              className={`text-lg w-[30px] h-[30px] mr-4 hover:text-red-700 ${exerciseDetail?.isFavorite ? "text-red-700" : ""
                }`}
            />
            <Link href={Pathnames.LIBRARY}>
              <HiOutlineXCircle className="text-lg w-[30px] h-[30px] hover:text-red-700" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 2xl:col-span-1 mb-10">
            {isLoaded ? (
              // <ReactPlayer className="w-full" url="https://vimeo.com/265111898" width="100%" height="auto" controls />
              <CustomVimeoPlayer videoUrl="https://vimeo.com/265111898" />
              // <Vimeo showTitle={false} className="w-full exercise-video" video={exerciseDetail?.vimeoId || ""} />
            ) : (
              <VimeoSkeleton />
            )}
          </div>
          <div className="col-span-3 2xl:col-span-2 2xl:ml-20">
            <h1 className="mb-10 font-bold text-md text-[2.2em] __className_679731 text-white whitespace-nowrap">
              {isLoaded ? exerciseDetail?.title : <VimeoTitleSkeleton />}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-2">
              {isLoaded ? (
                exerciseDetail?.categories.map(({ _id, icon, title }, index) => (
                  <Link
                    onClick={() => setSearchCategoryOption(_id)}
                    key={`category${index}`}
                    href={Pathnames.LIBRARY}
                    className="text-white bg-[#0d0d0d] hover:bg-red-700 hover:text-white focus:outline-none font-medium rounded-xl px-3 text-sm py-2 
                    dark:bg-[#0d0d0d] dark:hover:bg-gray-700 dark:border-gray-700"
                  >
                  <div className="relative flex items-center justify-center custom:flex-row gap-5">
                    <Image
                      src={ICON1_PATH}
                      className="w-10 h-10 mr-2"
                      alt="Thumbnail"
                      width={10}
                      height={10}
                    />
                    <span className="text-center">{title}</span>
                  </div>
                  </Link>
                ))
              ) : (
                <VimeoCategorySkeleton />
              )}
            </div>
            <QuickGuide guide={exerciseDetail?.description} />
            <Button
              color="red"
              className="w-64 mt-9 mb-20 px-5 py-2.5"
              onClick={handleNoteModal}
              placeholder="Note Modal Button"
            >
              <span className="flex m-1">
                <LuFileEdit className="mt-1 mr-6 w-6 h-6" />
                <p className="text-center mt-1">Add / View Notes</p>
              </span>
            </Button>
            <div>
              <div className="relative mb-20 exercise-carousel">
                {isLoaded ? (
                  exerciseDetail?.equipments.length ? (
                    <>
                      <h1 className="text-[1.6em] __className_679731 font-bold leading-none text-white dark:text-white mb-8">
                        EQUIPMENT USED
                      </h1>
                      <Carousel
                        className="mt-2 mb-15"
                        arrows={false}
                        infinite={true}
                        draggable={false}
                        autoPlay={true}
                        responsive={small_carousel_responsive}
                        renderButtonGroupOutside={exerciseDetail?.equipments.length > 2 ? true: false}
                        customButtonGroup={<SliderButtonGroup />}
                      >
                        {exerciseDetail.equipments.map(
                          ({ id, title, thumbnail, price, link }, index) => (
                            <div key={id}>
                              <Link target="new" href={link}>
                                <div className="relative w-full h-[15em]">
                                  <Image
                                    className="rounded-[1.2em] p-2"
                                    src={thumbnail}
                                    objectFit="cover"
                                    alt="Shop Equipment Thumbnail"
                                    fill={true}
                                  />
                                </div>
                                <div className="absolute bottom-0 w-full p-2 left-5 bottom-5">
                                  <p className="text-[1.2rem] font-medium text-white whitespace-nowrap mb-6">
                                    {title}
                                  </p>
                                  <p className="text-sm text-white/75">
                                    $ {price}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          )
                        )}
                      </Carousel>
                    </>
                  ) : (
                    <></>
                  )
                ) : (
                  <VimeoCarouselSkeleton />
                )}
              </div>
              <div className="mb-20 grid grid-cols-1 2xl:grid-cols-2 gap-20">
                <div className="w-full max-w-md text-white rounded-lg shadow dark:bg-[#0d0d0d] dark:border-gray-00">
                  <div className="flex items-center justify-between mb-6">
                    <h6 className="text-[1.6em] __className_679731 whitespace-nowrap font-bold leading-none text-white dark:text-white">
                      RELATED ECERCISES
                    </h6>
                    <Link
                      href={Pathnames.LIBRARY}
                      className="text-sm whitespace-nowrap text-white hover:underline dark:text-blue-500"
                    >
                      See all
                    </Link>
                  </div>
                  {isLoaded ? (
                    exerciseDetail?.relatedExercises.map((exercise) => (
                      <ExerciseListItem
                        key={exercise._id}
                        className="my-3"
                        exercise={exercise}
                      ></ExerciseListItem>
                    ))
                  ) : (
                    <ExercisesGroupSkeleton />
                  )}
                </div>
                <div className="w-full max-w-md text-white rounded-lg shadow dark:bg-[#0d0d0d] dark:border-gray-00">
                  <div className="flex items-center justify-between mb-6">
                    <h6 className="text-[1.6em] __className_679731 whitespace-nowrap font-bold leading-none text-white dark:text-white">
                      RECOMMENDED FOR YOU
                    </h6>
                    <Link
                      href={Pathnames.LIBRARY}
                      className="text-sm whitespace-nowrap text-white hover:underline dark:text-blue-500"
                    >
                      See all
                    </Link>
                  </div>
                  {isLoaded && exerciseRecommended ? (
                    exerciseRecommended.exercises?.map((exercise) => (
                      <ExerciseListItem
                        key={exercise._id}
                        className="my-3"
                        exercise={exercise}
                      ></ExerciseListItem>
                    ))
                  ) : (
                    <ExercisesGroupSkeleton />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <NoteDialog
          openModal={openNoteModal}
          headTitle={exerciseDetail ? exerciseDetail?.title : ""}
          note={exerciseDetail ? exerciseDetail?.note : ""}
          handleModal={handleNoteModal}
          onConfirm={noteChange}
        />
      </div>
    </main>
  );
}
