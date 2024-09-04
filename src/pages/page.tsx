import { useVideos } from "@/src/api/videos";
import CustomSwiper from "./CustomSwiper";
import { useEffect, useState } from "react";

export interface IVideos {
  [key: string]: {
    nickName: string;
    caption: string;
    createdAt: number;
    redirect: string;
  };
}

export default function Home() {
  const [videos, setVideos] = useState<IVideos>({});
  useVideos()
  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then(setVideos);
  }, []);
  const videosArr = Object.entries(videos).reverse();
  if (videosArr.length === 0) return "No videos found.";
  return <CustomSwiper videos={videosArr} />;
}
