import { FormDataApiInstance } from '@/api';

export const ExpertApi = {
  getAll(languageAbbr) {
    const url = `/api/experts?lang=${languageAbbr}`;
    return FormDataApiInstance.get(url);
  },
  getExpertSupervisee(languageAbbr, expertId) {
    const url = `/api/experts/supervisee/${expertId}?lang=${languageAbbr}`;
    return FormDataApiInstance.get(url);
  },
  getExpertSupervisors(languageAbbr, expertId) {
    const url = `/api/experts/supervisors/${expertId}?lang=${languageAbbr}`;
    return FormDataApiInstance.get(url);
  },
  getById(id, languageAbbr) {
    const url = `/api/expert/${id}?lang=${languageAbbr}`;
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
  editVideo(id, data, languageAbbr) {
    const url = `/api/expert/video/${id}?lang=${languageAbbr}`;
    return FormDataApiInstance.patch(url, data);
  },
  remove(id) {
    const url = `/api/expert/${id}`;
    return FormDataApiInstance.delete(url);
  },
  toggleStatus(id) {
    const url = `/api/expert/status/${id}`;
    return FormDataApiInstance.patch(url);
  }
};