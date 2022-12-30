import { LoginApiInstance, DefaultApiInstance } from '@/api';

export const AuthApi = {
  register(data) {
    const url = '/api/register';
    return LoginApiInstance.post(url, data);
  },

  login(data) {
    const url = '/api/login';
    return LoginApiInstance.post(url, data);
  },

  logout() {
    const url = '/logout';
    return LoginApiInstance.post(url);
  }
};