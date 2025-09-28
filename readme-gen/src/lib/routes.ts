export const routes = {
  home: "/",
  auth: {
    signin: "/auth/signin",
    signup: "/auth/signup",
    forgot: "/auth/forgot-password",
    reset: "/auth/reset-password",
  },
  dashboard: {
    index: "/dashboard",
    projects: "/dashboard/projects",
    generate: "/dashboard/generate",
    profile: "/dashboard/profile",
    settings: "/dashboard/settings",
  },
  legal: {
    terms: "/terms",
    privacy: "/privacy",
  },
  contact: "/contact",
} as const;

export type Routes = typeof routes;