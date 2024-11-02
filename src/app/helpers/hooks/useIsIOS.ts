export const useIsIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};
