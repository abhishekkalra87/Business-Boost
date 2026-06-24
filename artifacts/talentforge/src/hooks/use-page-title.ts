import { useEffect } from "react";

export function usePageTitle(page?: string) {
  useEffect(() => {
    document.title = page
      ? `${page} | Nexzenta HR Solutions`
      : "Nexzenta HR Solutions";
  }, [page]);
}
