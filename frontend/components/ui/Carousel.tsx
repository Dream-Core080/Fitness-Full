import { ButtonGroupProps } from 'react-multi-carousel/lib/types';
export const carousel_responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1800 },
      items: 5
    },
    laptop: {
      breakpoint: { max: 1800, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
export const small_carousel_responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1800 },
    items: 3
  },
  laptop: {
    breakpoint: { max: 1800, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
 export const SliderButtonGroup = ({ next, previous } : ButtonGroupProps ) => {
    return (
      <div className="carousel-button-group">
        <button
            type="button"
            className="absolute top-5 -mx-[6rem] start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
            onClick={() => previous?previous():{}}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 
              dark:group-hover:bg-gray-800/60">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-5 -mx-[6rem] end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={() => next?next():{}}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 
              dark:group-hover:bg-gray-800/60">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    );
  };