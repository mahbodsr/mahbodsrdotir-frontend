import { AxiosResponse } from "axios";
import { fetcher } from "./fetcher.helper";
import { IVideos } from "./videos.type";
import useSWR from "swr";

export const useVideos = () =>
  useSWR<AxiosResponse<IVideos>>("/videos", fetcher);
