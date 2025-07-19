export interface ApiResponse<T> {
  status: string; // or HttpStatus enum if you define it
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  status: string;
  message: string;
  errors: string | Record<string, string>; // accepts string or map-like object
}