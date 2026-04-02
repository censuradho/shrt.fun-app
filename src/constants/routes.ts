export const paths = {
  public: {
    signin: "/",
    forgotPassword: '/forgot-password',
    signUp: '/signup',
    resetPassword: '/reset-password'
  },
  private: {
    root: '/app',
    analytics: 'analytics',
    link: {
      list: "/app/links",
      create: "/app/links/create",
      details: '/app/links/:id',
      qrCustomize: '/app/links/:id/qrcode'
    }
  }
} as const