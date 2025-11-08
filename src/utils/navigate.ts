import { NavigateOptions } from "react-router-dom";

let navigateFunction: ((to: string, options?: NavigateOptions) => void) | null = null;

export const setNavigate = (nav: (to: string, options?: NavigateOptions) => void) => {
  navigateFunction = nav;
};

export const navigate = (to: string, options?: NavigateOptions) => {
  if (navigateFunction) {
    navigateFunction(to, options);
  } else {
    console.error("Navigate function is not set yet!");
  }
};