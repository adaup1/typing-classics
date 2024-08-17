import { useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import { DebounceSettings } from "lodash";

export const useDebounce = (
  callback: Function,
  delay: number,
  options?: DebounceSettings
) => {
  const debounceOptions = { leading: false, trailing: true, ...options };
  const callbackRef = useRef(callback);
  const debounceRef = useRef(
    debounce(
      (...args: any) => {
        return callbackRef.current(...args);
      },
      delay,
      debounceOptions
    )
  );

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return debounceRef.current;
};
