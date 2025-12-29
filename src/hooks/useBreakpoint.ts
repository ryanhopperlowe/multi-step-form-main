import { useState, useEffect } from "react";

const breakpoints = {
  sm: 0,
  md: 400,
};

export const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<keyof typeof breakpoints>("sm");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let newBreakpoint: keyof typeof breakpoints = "sm";

      for (const key in breakpoints) {
        if (screenWidth >= breakpoints[key as keyof typeof breakpoints]) {
          newBreakpoint = key as keyof typeof breakpoints;
        }
      }
      setCurrentBreakpoint(newBreakpoint);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial breakpoint

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isSm: currentBreakpoint === "sm",
    isMd: currentBreakpoint === "md",
    breakpoint: currentBreakpoint,
  };
};
