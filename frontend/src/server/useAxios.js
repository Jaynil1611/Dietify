import { useEffect, useState } from "react";
import { useProduct } from "../contexts";
import { callMockServer } from "./index";
import { actions } from "../reducers";
import { handleToast } from "../components";
import { checkAuthStatus } from "../utils";
import { constructURL } from "./ServerUpdate";

export default function useAxios(resource, name, isAuthRequired) {
  const { dispatch, token } = useProduct();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (checkAuthStatus(token, isAuthRequired)) {
      setLoadingStatus(true);
      (async () => {
        try {
          const {
            response: { data },
            error,
          } = await callMockServer({
            type: "get",
            url: `${constructURL()}/${resource}`,
          });
          if (!error) {
            dispatch({
              type: actions.INITIALIZE_LIST,
              payload: { name, data: data[resource] },
            });
          }
        } catch (error) {
          setError(true);
          handleToast(dispatch, "Something is wrong, please try again later!");
        } finally {
          setLoadingStatus(false);
        }
      })();
    }
  }, [token, isAuthRequired, dispatch]);

  return { loadingStatus, error };
}
