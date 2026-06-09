import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import posthog from 'posthog-js';
import { PostHogProvider } from '@posthog/react';

posthog.init(import.meta.env.VITE_POSTHOG_PROJECT_TOKEN, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  defaults: '2026-01-30',
});

window.addEventListener('unhandledrejection', (event) => {
  posthog.captureException(event.reason);
});
window.onerror = (_message, _source, _lineno, _colno, error) => {
  if (error) posthog.captureException(error);
};

createRoot(document.getElementById("root")!).render(
  <PostHogProvider client={posthog}>
    <App />
  </PostHogProvider>
);
