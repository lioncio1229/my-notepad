export const endpoints = {
  authentication: "/api/account/auth",
  validation: "/api/account/validate",
  newTokenId: '/api/account/newTokenId',
  user: "/api/user",
  notes: "/api/notes",
};

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://my-notepad-api.onrender.com";
