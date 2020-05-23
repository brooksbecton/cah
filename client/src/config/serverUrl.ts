export const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://cah-mobile.herokuapp.com"
    : "http://localhost:5555";
