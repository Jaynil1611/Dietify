import React, { useEffect } from "react";

function useDocumentRoot(showFilter) {
  useEffect(() => {
    const root = document.querySelector("#root");
    if (showFilter) {
      root.classList.add("hide-overflow");
    }
    return () => root.classList.remove("hide-overflow");
  }, [showFilter]);
  return <></>;
}

export default useDocumentRoot;
