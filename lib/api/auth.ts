import { apiFetch } from "./client";

export const authApi = {
  register: (data: { email: string; password: string }) =>
    apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  verifyOtp: (data: { userId: string; otp: string }) =>
    apiFetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiFetch("/api/auth/logout", {
      method: "POST",
    }),
};
