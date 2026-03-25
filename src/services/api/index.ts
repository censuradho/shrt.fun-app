import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const setApiToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return
  }

  delete api.defaults.headers.common['Authorization'];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      // const session = await authGateway.getUser();
      // if (session) {
      //   setApiToken(session.accessToken);
      //   error.config.headers['Authorization'] = `Bearer ${session.accessToken}`;
      //   return api.request(error.config);
      // }
    }

    return Promise.reject(error);
  }
)