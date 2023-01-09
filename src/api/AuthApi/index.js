import { AuthApiInstance } from '@/api';

export const AuthApi = {
  register(data) {
    const url = '/api/register';
    return AuthApiInstance.post(url, data);
  },

  login(data) {
    const url = '/api/login';
    return AuthApiInstance.post(url, data);
  },

  logout() {
    const url = '/logout';
    return AuthApiInstance.post(url);
  }
};