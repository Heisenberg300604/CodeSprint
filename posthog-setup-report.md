# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into CodeSprint — a React/Vite code typing speed test application. PostHog is initialized in `src/main.tsx` using the `posthog-js` client SDK and wrapped with `PostHogProvider` so all components can access it via the `usePostHog` hook. Global error tracking is wired up via `window.onerror` and `window.addEventListener('unhandledrejection')` to capture uncaught exceptions automatically. Eight meaningful user action events are tracked across three key files covering the full test lifecycle, configuration changes, and engagement patterns.

| Event | Description | File |
|---|---|---|
| `test_started` | Fired on the first keystroke or Tab press that transitions the test from IDLE to RUNNING. Captures `language`, `difficulty`, `duration`. | `src/hooks/useTypingEngine.ts` |
| `test_completed` | Fired when the countdown timer expires. Captures `language`, `difficulty`, `duration`, `wpm`, `accuracy`, `errors`, `total_chars_typed`, `snippets_completed`, `is_personal_best`. | `src/hooks/useTypingEngine.ts` |
| `personal_best_achieved` | Fired inside `test_completed` when the user's WPM exceeds their stored personal best. Captures `language`, `difficulty`, `wpm`, `previous_best`. | `src/hooks/useTypingEngine.ts` |
| `test_restarted` | Fired when the Retry button is clicked on the results screen. Captures `language`, `duration`, `wpm`, `accuracy`. | `src/components/ResultsScreen.tsx` |
| `new_test_loaded` | Fired when the New Test button is clicked on the results screen. Captures `language`, `duration`. | `src/components/ResultsScreen.tsx` |
| `language_changed` | Fired when the user changes the programming language from the config bar. Captures `language`, `previous_language`. | `src/components/ConfigBar.tsx` |
| `difficulty_changed` | Fired when the user changes the difficulty level. Captures `difficulty`, `previous_difficulty`. | `src/components/ConfigBar.tsx` |
| `duration_changed` | Fired when the user changes the test duration. Captures `duration`, `previous_duration`. | `src/components/ConfigBar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://eu.posthog.com/project/197802/dashboard/735153)
- [Tests started — Daily unique users who began a test](https://eu.posthog.com/project/197802/insights/orDRs9I9)
- [Test completion funnel — Conversion from test_started to test_completed](https://eu.posthog.com/project/197802/insights/KrtlkqpG)
- [Tests by language — Which programming languages users practice most](https://eu.posthog.com/project/197802/insights/YWkjP065)
- [Personal bests achieved — How often users hit new WPM records](https://eu.posthog.com/project/197802/insights/jUSH9AmF)
- [Retry vs new test rate — Re-engagement patterns after completing a test](https://eu.posthog.com/project/197802/insights/qx4IM9Ta)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
