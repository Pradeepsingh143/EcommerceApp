import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function GoToTop() {
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
  };

  // By default when react router change route. we are directed to a different page, but it doesn’t load from the top. It cannot load the page from a different position
  useLayoutEffect(() => {
    onTop();
  }, [routePath]);

  return null;
}
