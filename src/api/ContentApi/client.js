import {FormDataApiInstance, DefaultApiInstance} from '@/api';

export const ClientApi = {
  getNotAssigned(page) {
    const url = `/api/users?expert_id=0&page=${page}`;
    return FormDataApiInstance.get(url);
  },
  getAssigned(expertId, page) {
    const url = `/api/users?expert_id=${expertId}&page=${page}`;
    return FormDataApiInstance.get(url);
  },
  getById(id) {
    const url = `/api/user/${id}`;
    return FormDataApiInstance.get(url);
  },
  create(data) {
    const url = '/api/user';
    return FormDataApiInstance.post(url, data);
  },
  edit(id, data) {
    const url = `/api/user/${id}`;
    return FormDataApiInstance.patch(url, data);
  },
  remove(id) {
    const url = `/api/user/${id}`;
    return FormDataApiInstance.delete(url);
  },
  toggleStatus(id) {
    const url = `/api/user/status/${id}`;
    return DefaultApiInstance.patch(url);
  },
  changeClientAssignment(userId, expertId) {
    const url = `/api/user/assignment/`;
    return DefaultApiInstance.patch(url, {userId, expertId});
  }
};