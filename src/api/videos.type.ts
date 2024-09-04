export interface IVideos {
  [key: string]: {
    nickName: string;
    caption: string;
    createdAt: number;
    redirect: string;
  };
}