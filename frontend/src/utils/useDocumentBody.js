import React, { useEffect } from "react";

function useDocumentBody(showFilter) {
  useEffect(() => {
    const body = document.body;
    if (showFilter) {
      body.classList.add("hide-overflow");
    }
    return () => body.classList.remove("hide-overflow");
  }, [showFilter]);
  return <></>;
}

export default useDocumentBody;
