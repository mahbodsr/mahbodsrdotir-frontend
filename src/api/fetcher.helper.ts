import axios from "axios";

export const mutater = <TRequest extends object, TResponse>(
  url: string,
  { arg, method }: { arg: TRequest; method: string }
) =>
  axios<TResponse>({
    url: `${import.meta.env.VITE_API_BASE_URL}${url}`,
    method,
    data: arg,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

export const fetcher = <TResponse>(url: string) =>
  axios.get<TResponse>(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
    withCredentials: true,
  });
