import axios from 'axios';

const loginConfig = {
  baseURL: process.env.VUE_APP_BACK_END_URL,
  headers: {
    'Content-Type': 'application/json',
  }
};

export const LoginApiInstance = axios.create(loginConfig);

const token = localStorage.getItem('token');

const defaultConfig = {
  baseURL: process.env.VUE_APP_BACK_END_URL,
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}`,
  }
};

export const DefaultApiInstance = axios.create(defaultConfig);


const formDataApiConfig = {
  baseURL: process.env.VUE_APP_BACK_END_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'authorization': `Bearer ${token}`,
  }
};

export const FormDataApiInstance = axios.create(formDataApiConfig);

export function SetTokenToDefaultApiInstance(token) {
  DefaultApiInstance.interceptors.request.use(function (config) {
    config.headers['authorization'] = `Bearer ${token}`;
    return config;
  });
}

