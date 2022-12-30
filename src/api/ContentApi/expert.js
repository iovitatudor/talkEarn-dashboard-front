import { FormDataApiInstance } from '@/api';

export const ExpertApi = {
  getAll() {
    const url = '/api/experts';
    return FormDataApiInstance.get(url);
  },
  getById(id) {
    const url = `/api/expert/${id}`;
    return FormDataApiInstance.get(url);
  },
  create(data) {
    const url = '/api/expert';
    return FormDataApiInstance.post(url, data);
  },
  edit(id, data) {
    const url = `/api/expert/${id}`;
    return FormDataApiInstance.patch(url, data);
  },
  remove(id) {
    const url = `/api/expert/${id}`;
    return FormDataApiInstance.delete(url);
  }
};