import { useEffect } from "react";
import { closeToast } from "../components";
import { useProduct } from "../contexts";

export default function useToastCleaner() {
  const { dispatch } = useProduct();

  useEffect(() => {
    closeToast(dispatch);
  }, []);
}
