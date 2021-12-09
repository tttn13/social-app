import { useEffect } from "react";

export const useDetectInputChange = ({ ref, execFn, parentRef }) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target) && parentRef.current.contains(e.target)) {
        execFn();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, execFn, parentRef]);
};
