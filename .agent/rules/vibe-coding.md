---
trigger: always_on
---

# Vibe Coding Guidelines

1.  **Plan Before You Code:** Never start writing code without first creating or updating the `implementation_plan.md`.
2.  **Tailwind Proficiency:** Do not write custom CSS files. Use Tailwind utility classes for everything (e.g., `flex min-h-screen bg-gray-50`).
3.  **Mobile First:** Always write CSS for mobile first, then add `md:` and `lg:` breakpoints.
4.  **Error Handling:** Every API call in the frontend must be wrapped in `try/catch` with a UI toast notification on failure.