import { useEffect } from "react";

export default function useDocumentTitle(text) {
  useEffect(() => {
    document.title = `Dietify | ${text}`;
  }, [text]);
}
