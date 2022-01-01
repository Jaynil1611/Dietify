import { useEffect } from "react";
import { useLocation } from "react-router";
import { closeToast } from "../components";
import { useProduct } from "../contexts";

export default function useCleaner() {
  const { dispatch } = useProduct();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/login" || pathname !== "signup") closeToast(dispatch);
    window.scrollTo(0, 0);
  }, [dispatch, pathname]);
}
