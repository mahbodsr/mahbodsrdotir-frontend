import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { mutater } from "./fetcher.helper";
import {
  ISendOTPRequest,
  IVerifyOTPRequest,
  ISendOTPError,
  IVerifyOTPError,
} from "./otp.type";
import { AxiosResponse, AxiosError } from "axios";

export const useSendOTP = (
  options?: SWRMutationConfiguration<
    AxiosResponse<void>,
    AxiosError<ISendOTPError>,
    string,
    ISendOTPRequest
  >
) => {
  return useSWRMutation<
    AxiosResponse<void>,
    AxiosError<ISendOTPError>,
    string,
    ISendOTPRequest
  >(
    "/otp/send",
    (url, { arg }) =>
      mutater<ISendOTPRequest, void>(url, {
        arg,
        method: "POST",
      }),
    options
  );
};

export const useVerifyOTP = (
  options?: SWRMutationConfiguration<
    AxiosResponse<void>,
    AxiosError<IVerifyOTPError>,
    string,
    IVerifyOTPRequest
  >
) => {
  return useSWRMutation<
    AxiosResponse<void>,
    AxiosError<IVerifyOTPError>,
    string,
    IVerifyOTPRequest
  >(
    "/otp/verify",
    (url, { arg }) =>
      mutater<IVerifyOTPRequest, void>(url, {
        arg,
        method: "POST",
      }),
    options
  );
};
