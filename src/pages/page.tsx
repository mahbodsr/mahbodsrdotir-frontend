import { useVideos } from "@/src/api/videos";
import CustomSwiper from "./CustomSwiper";
import { useEffect } from "react";

export interface IVideos {
  [key: string]: {
    nickName: string;
    caption: string;
    createdAt: number;
    redirect: string;
  };
}

export default function Home() {
  const { data, mutate } = useVideos();
  const videosArr = data?.data ? Object.entries(data.data).reverse() : [];

  useEffect(() => {
    const ArrowKeyHandler = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        mutate();
      }
    };
    window.addEventListener("keydown", ArrowKeyHandler);
    return () => {
      window.removeEventListener("keydown", ArrowKeyHandler);
    };
  }, [mutate]);

  if (videosArr.length === 0) return "No videos found.";
  return <CustomSwiper videos={videosArr} />;
}
