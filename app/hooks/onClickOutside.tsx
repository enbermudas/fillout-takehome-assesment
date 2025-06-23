import { RefObject, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useOnClickOutside(ref: RefObject<any>, handleBlur: () => void) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleBlur();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleBlur]);
}
