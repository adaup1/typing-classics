import { useCallback } from "react";

export const useThrottle = () => {
  const throttle = (func: Function, limit: number) => {
    let lastFunc: any;
    let lastRan: any;
    return function (...args: any) {
      if (!lastRan) {
        func.apply(null, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(
          function () {
            if (Date.now() - lastRan >= limit) {
              func.apply(null, args);
              lastRan = Date.now();
            }
          },
          limit - (Date.now() - lastRan)
        );
      }
    };
  };

  return { throttle };
};
