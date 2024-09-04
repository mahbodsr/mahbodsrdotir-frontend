import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const Component = () => {
  const { chatId, messageId } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const FullScreenHandler = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") videoRef.current?.requestFullscreen();
    };
    window.addEventListener("keydown", FullScreenHandler);
    return () => window.removeEventListener("keydown", FullScreenHandler);
  }, [videoRef]);
  return (
    <video autoPlay controls ref={videoRef}>
      <source src={`/api/stream/${chatId}/${messageId}`} type="video/mp4" />
    </video>
  );
};

export default Component;
