export const paths = {
  public: {
    signin: "/",
    forgotPassword: '/forgot-password',
    signUp: '/signup',
  },
  private: {
    root: '/app',
    link: {
      list: "/app/links",
      create: "/app/links/create",
      details: '/app/links/:id'
    }
  }
} as const