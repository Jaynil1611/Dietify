import { useEffect, useState } from "react";
import { useProduct } from "../contexts";
import { callMockServer } from "./index";
import { actions } from "../reducers";

const userId = "6082a6790b7e110cb360760e";

export default function useAxios(resource, name) {
  const { dispatch } = useProduct();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoadingStatus(true);
    (async () => {
      try {
        const {
          response: { data },
          error,
        } = await callMockServer({
          type: "get",
          url: constructURL(resource),
        });
        if (!error) {
          dispatch({
            type: actions.INITIALIZE_LIST,
            payload: { name, data: data[resource] },
          });
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoadingStatus(false);
      }
    })();
  }, []);

  return { loadingStatus, error };
}

const constructURL = (resource) => {
  if (resource === "products") {
    return `${process.env.REACT_APP_BACKEND_URL}/${resource}`;
  }
  return `${process.env.REACT_APP_BACKEND_URL}/user/${userId}/${resource}`;
};
