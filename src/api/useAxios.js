import { useEffect, useState } from "react";
import axios from "axios";

export default function useAxios(dataURL) {
  const [data, setData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoadingStatus(true);

    (async () => {
      try {
        const res = await axios.get(dataURL);
        if (res.status === 200) {
          setData(res.data);
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
