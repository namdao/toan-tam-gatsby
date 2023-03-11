// ----------------------------------------------------------------------

import { useLocation } from "@reach/router";

type ReturnType = {
  active: boolean;
  isExternalLink: boolean;
};

export default function useActiveLink(path: string, deep = true): ReturnType {
  const location = useLocation();

  const { pathname } = location;
  console.log(path);
  const checkPath = path.startsWith("#");
  const currentPath = path === "/" ? "/" : `${path}`;
  const normalActive = !checkPath && pathname === currentPath;

  const deepActive = !checkPath && pathname.includes(currentPath);

  return {
    active: deep ? deepActive : normalActive,
    isExternalLink: path.includes("http"),
  };
}
