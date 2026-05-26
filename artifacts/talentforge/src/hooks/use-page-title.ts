import { useEffect } from "react";

export function usePageTitle(page?: string) {
  useEffect(() => {
    document.title = page
      ? `${page} | Nexora HR Solutions`
      : "Nexora HR Solutions";
  }, [page]);
}
