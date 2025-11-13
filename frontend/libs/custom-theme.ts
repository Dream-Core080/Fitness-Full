export const customTheme = {
  dialog: {
    styles: {
      base: {
        backdrop: {
          backgroundColor: "bg-black",
        },
        container: {
          bg: "bg-neutral-900",
        },
      },
    },
  },
  dialogHeader: {
    styles: {
      base: {
        color: "text-white",
      },
    },
  },
  textarea: {
    styles: {
      base: {
        textarea: {
          bg: "bg-transparent",
          color: "text-white/60",
          outline: "outline outline-0 focus:outline-0",
          disabled: "disabled:bg-blue-gray-50 disabled:border-0",
        },
        label: {
          color: "peer-placeholder-shown:white",
          disabled:
            "peer-disabled:text-white peer-disabled:peer-placeholder-shown:text-white",
        },
      },
    },
  },
  button: {
    defaultProps: {
      variant: "gradient",
    },
    styles: {
      variants: {
        gradient: {
          red: {
            backgroud: "bg-gradient-to-tr from-[#A51E22] to-red-600",
            color: "text-white",
            shadow: "shadow-md shadow-red-500/20",
            hover: "hover:shadow-lg hover:shadow-red-500/40",
            active: "active:opacity-[0.85]",
          },
        },
      },
    },
  },
};
