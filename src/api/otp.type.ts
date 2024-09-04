export interface ISendOTPRequest {
  username: string;
}
export interface ISendOTPError {
  error: string;
}

export interface IVerifyOTPRequest {
  username: string;
  otp: string;
}
export interface IVerifyOTPError {
  error: string;
}
