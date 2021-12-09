import { useEffect } from "react";

export const useOutsideAlerter = ({ ref, setModalActive }) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setModalActive(false);
      } 
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setModalActive]);
};
