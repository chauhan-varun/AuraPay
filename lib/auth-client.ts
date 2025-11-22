import { createAuthClient } from "better-auth/react";

// Use a public env var for the client-side base URL. In production this should
// be set to your deployed origin (for example `https://app.example.com`). If
// it's not set or is localhost, we use an empty string which makes requests use the
// current origin (relative paths).
const getBaseURL = () => {
  const envURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  
  // If no URL is set or it's localhost, use relative URLs
  if (!envURL || envURL.includes('localhost') || envURL.includes('127.0.0.1')) {
    return '';
  }
  
  return envURL;
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});
