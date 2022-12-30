import { DefaultApiInstance } from '@/api';

export const ParameterApi = {
  getAll() {
    const url = '/api/parameters';
    return DefaultApiInstance.get(url);
  },
  getById(id) {
    const url = `/api/parameter/${id}`;
    return DefaultApiInstance.get(url);
  },
  create(data) {
    const url = '/api/parameter';
    return DefaultApiInstance.post(url, data);
  },
  edit(id, data) {
    const url = `/api/parameter/${id}`;
    return DefaultApiInstance.patch(url, data);
  },
  remove(id) {
    const url = `/api/parameter/${id}`;
    return DefaultApiInstance.delete(url);
  }
};