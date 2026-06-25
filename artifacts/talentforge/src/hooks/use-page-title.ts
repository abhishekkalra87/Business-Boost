import { useEffect } from "react";

export function usePageTitle(page?: string) {
  useEffect(() => {
    document.title = page
      ? `${page} | NexZenta`
      : "NexZenta — Specialized Talent Partner";
  }, [page]);
}
