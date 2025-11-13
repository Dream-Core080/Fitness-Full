"use client";

import { useQuery } from "react-query";
import { ThemeProvider } from "@material-tailwind/react";
import { useAuthStore } from "@/stores/auth";
import { customTheme } from "@/libs/custom-theme";
import { fetchMe } from "@/app/auth/auth.api";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  const { isLogged, setIsLogged, setUser } = useAuthStore();
  useQuery(["me"], fetchMe, {
    enabled: isLogged,
    onSuccess: setUser,
    onError: (err) => {
      setIsLogged(false);
    },
  });

  return (
    <ThemeProvider value={customTheme}>
      <ProgressBar
        height="4px"
        color="#ffffff"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <>{children}</>
      {/* <>{children}</> */}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
