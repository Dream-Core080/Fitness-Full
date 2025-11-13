export const CarouselImageSkeleton = () => (
  <div className="flex animate-pulse items-center justify-center w-full h-full bg-gray-300 rounded-lg dark:bg-gray-700">
    <svg
      className="w-10 h-10 text-gray-200 dark:text-gray-600"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 18"
    >
      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
    </svg>
  </div>
);
export const CarouselSkeleton = () => (
  <>
    <div className="dark animate-pulse h-64 p-2 space-y-8 md:space-y-0 md:space-x-8 md:flex md:items-center">
      <CarouselImageSkeleton />
      <CarouselImageSkeleton />
      <CarouselImageSkeleton />
      <CarouselImageSkeleton />
      <CarouselImageSkeleton />
    </div>
  </>
);
export const TagsSkeleton = () => (
  <>
    <div className="dark animate-pulse w-96 h-10 flex space-y-0 space-x-2">
      <div className="w-full h-full bg-gray-300 rounded-lg dark:bg-gray-700"></div>
      <div className="w-full h-full bg-gray-300 rounded-lg dark:bg-gray-700"></div>
      <div className="w-full h-full bg-gray-300 rounded-lg dark:bg-gray-700"></div>
      <div className="w-full h-full bg-gray-300 rounded-lg dark:bg-gray-700"></div>
      <div className="w-full h-full bg-gray-300 rounded-lg dark:bg-gray-700"></div>
    </div>
  </>
);
export const CategoriesSkeleton = () => (
  <>
    <div className="dark animate-pulse h-40 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-8">
      <CarouselImageSkeleton />
      <CarouselImageSkeleton />
      <CarouselImageSkeleton />
      <CarouselImageSkeleton />
      <CarouselImageSkeleton />
      <CarouselImageSkeleton />
      <CarouselImageSkeleton />
    </div>
  </>
);
export const ExerciseSkeleton = () => (
  <div className="flex items-center gap-5 p-3 w-full h-full bg-gray-300 rounded-lg dark:bg-gray-700 h-20">
    <div className="rounded-lg bg-gray-500 w-10 h-10"></div>
    <div className="flex flex-col gap-2 w-9/12">
      <span className="w-11/12 bg-gray-500 h-2 rounded-full"></span>
      <span className="w-9/12 bg-gray-500 h-2 rounded-full"></span>
    </div>
  </div>
);
export const ExercisesGroupSkeleton = () => (
  <>
    <div className="dark animate-pulse w-full flex flex-col gap-3">
      <ExerciseSkeleton />
      <ExerciseSkeleton />
      <ExerciseSkeleton />
      <ExerciseSkeleton />
      <ExerciseSkeleton />
    </div>
  </>
);
export const ExercisesSkeleton = () => {
  return (
    <div className="mb-20 dark animate-pulse grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[1.75rem] xl:gap-x-[3.5rem] 2xl:gap-x-[7.5rem]">
      {Array(30)
        .fill(0)
        .map((el, index) => (
          <ExerciseSkeleton key={index} />
        ))}
    </div>
  );
};
export const VimeoSkeleton = () => {
  return (
    <>
      <div className="dark animate-pulse flex items-center justify-center h-96 max-w-sm bg-gray-700 rounded-lg">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
        </svg>
      </div>
    </>
  );
};
export const VimeoTitleSkeleton = () => {
  return (
    <>
      <div className="dark animate-pulse flex items-center justify-center h-12 max-w-sm bg-gray-700 rounded-lg"></div>
    </>
  );
};
export const VimeoCategorySkeleton = () => {
  return (
    <>
      <div className="dark animate-pulse flex items-center justify-center h-16 max-w-sm bg-gray-700 rounded-lg"></div>
      <div className="dark animate-pulse flex items-center justify-center h-16 max-w-sm bg-gray-700 rounded-lg"></div>
      <div className="dark animate-pulse flex items-center justify-center h-16 max-w-sm bg-gray-700 rounded-lg"></div>
      <div className="dark animate-pulse flex items-center justify-center h-16 max-w-sm bg-gray-700 rounded-lg"></div>
    </>
  );
};
export const VimeoCarouselSkeleton = () => (
  <>
    <h1 className="text-md font-bold leading-none text-white dark:text-white mb-8">
      EQIPMENT USED
    </h1>
    <div className="dark animate-pulse h-48 p-2 space-y-8 md:space-y-0 md:space-x-8 md:flex md:items-center">
      <CarouselImageSkeleton />
      <CarouselImageSkeleton />
      <CarouselImageSkeleton />
      <CarouselImageSkeleton />
    </div>
  </>
);
