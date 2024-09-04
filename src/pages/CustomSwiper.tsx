import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import  { useEffect, useRef, useState } from "react";
import Card from "./Card";
import "swiper/css";
import "swiper/css/pagination";
import { IVideos } from "./page";
import { useNavigate } from "react-router-dom";

type TVideos = [string, IVideos[string]][];

const CustomSwiper = ({ videos }: { videos: TVideos }) => {
  const swiperRef = useRef<SwiperClass>();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    const ArrowKeyHandler = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") swiperRef.current?.slidePrev(150);
      else if (event.key === "ArrowRight") swiperRef.current?.slideNext(150);
    };
    window.addEventListener("keydown", ArrowKeyHandler);
    return () => {
      window.removeEventListener("keydown", ArrowKeyHandler);
    };
  }, [swiperRef]);
  useEffect(() => {
    const EnterHandler = (event: KeyboardEvent) => {
      console.log("Hanled");
      if (event.key === "Enter") navigate(videos[activeIndex][0]);
    };
    window.addEventListener("keypress", EnterHandler);
    return () => {
      window.removeEventListener("keypress", EnterHandler);
    };
  }, [activeIndex, navigate, videos]);
  return (
    <Swiper
      onSwiper={(s) => (swiperRef.current = s)}
      pagination={{}}
      centeredSlides={true}
      modules={[Pagination]}
      slidesPerView={1}
      onSlideChange={(s) => setActiveIndex(s.activeIndex)}
      className="lg:w-3/5 overflow-visible h-5/6"
    >
      {videos.map(([link, video]) => (
        <SwiperSlide key={link} className="p-2 pb-8">
          <Card
            caption={video.caption}
            filename={video.nickName}
            createdAt={video.createdAt}
            link={video.redirect ?? link}
            buttonText={video.redirect ? "Go to link" : "Watch"}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
