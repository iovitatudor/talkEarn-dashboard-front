import { FormDataApiInstance } from '@/api';

export const CategoryApi = {
  getAll() {
    const url = '/api/categories';
    return FormDataApiInstance.get(url);
  },
  getById(id) {
    const url = `/api/category/${id}`;
    return FormDataApiInstance.get(url);
  },
  create(data) {
    const url = '/api/category';
    return FormDataApiInstance.post(url, data);
  },
  edit(id, data) {
    const url = `/api/category/${id}`;
    return FormDataApiInstance.patch(url, data);
  },
  remove(id) {
    const url = `/api/category/${id}`;
    return FormDataApiInstance.delete(url);
  }
};