import React from "react"

export const useFocus = () => {
  const htmlElRef = React.useRef<HTMLElement>(null)
  const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
  const setBlur = () => { htmlElRef.current && htmlElRef.current.blur() }
  
  return [htmlElRef, setFocus, setBlur]
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState<{
    width: number,
    height: number
  }>(getWindowDimensions());

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};