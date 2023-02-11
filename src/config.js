export const endpoints = {
  authentication: "/api/account/auth",
  validation: "/api/account/validate",
  newTokenId: '/api/account/newTokenId',
  user: "/api/user",
  logout: '/api/user/logout',
  notes: "/api/notes",
  addNotes: "/api/notes/addnotes",
};

export const loadingCircle = {
  message: 'This is taking too long to load',
  timeout: 12000,
};

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://my-notepad-api.onrender.com";
