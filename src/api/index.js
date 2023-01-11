import axios from 'axios';

const authConfig = {
  baseURL: process.env.VUE_APP_BACK_END_URL,
  headers: {
    'Content-Type': 'application/json',
  }
};

const token = localStorage.getItem('token');

const defaultConfig = {
  baseURL: process.env.VUE_APP_BACK_END_URL,
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}`,
  }
};

const formDataApiConfig = {
  baseURL: process.env.VUE_APP_BACK_END_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'authorization': `Bearer ${token}`,
  }
};

export const AuthApiInstance = axios.create(authConfig);

export const DefaultApiInstance = axios.create(defaultConfig);

export const FormDataApiInstance = axios.create(formDataApiConfig);

export function SetTokenToDefaultApiInstance(token) {
  DefaultApiInstance.interceptors.request.use(function (config) {
    config.headers['authorization'] = `Bearer ${token}`;
    return config;
  });
}

export function SetTokenToFormDataApiInstance(token) {
  FormDataApiInstance.interceptors.request.use(function (config) {
    config.headers['authorization'] = `Bearer ${token}`;
    return config;
  });
}

