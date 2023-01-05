import { FormDataApiInstance } from '@/api';

export const ServiceApi = {
  getByExpert(expertId) {
    const url = `/api/services/expert/${expertId}`;
    return FormDataApiInstance.get(url);
  },
  getById(id) {
    const url = `/api/service/${id}`;
    return FormDataApiInstance.get(url);
  },
  create(data) {
    const url = '/api/service';
    return FormDataApiInstance.post(url, data);
  },
  edit(id, data) {
    const url = `/api/service/${id}`;
    return FormDataApiInstance.patch(url, data);
  },
  remove(id) {
    const url = `/api/service/${id}`;
    return FormDataApiInstance.delete(url);
  }
};