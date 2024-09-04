import { fetcher } from "./fetcher.helper";
import { IVideos } from "./videos.type";

export const useVideos = () => fetcher<IVideos[]>("/videos");