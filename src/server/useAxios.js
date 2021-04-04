import { useEffect, useState } from "react";
import { callMockServer } from "./index";

export default function useAxios(url) {
  const [data, setData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoadingStatus(true);

    (async () => {
      try {
        const { response, error } = await callMockServer({
          type: "get",
          url,
        });
        if (!error) {
          setData(response.data);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoadingStatus(false);
      }
    })();
  }, []);

  return [data, loadingStatus, error];
}
