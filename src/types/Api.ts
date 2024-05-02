export interface ApiResponseType<T = any> {
    status: "success" | "error";
    msg?: string;
    data?: T;
  }
  