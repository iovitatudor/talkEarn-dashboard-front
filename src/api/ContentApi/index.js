import { DefaultApiInstance } from '@/api';

export const ExpertsApi = {
  getAll() {
    const url = '/api/experts';
    return DefaultApiInstance.get(url);
  },
};