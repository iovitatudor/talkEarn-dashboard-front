import { FormDataApiInstance } from '@/api';

export const LanguageApi = {
  getAll() {
    const url = '/api/languages';
    return FormDataApiInstance.get(url);
  },
  getById(id) {
    const url = `/api/language/${id}`;
    return FormDataApiInstance.get(url);
  },
  getByAbbr(abbr) {
    const url = `/api/language/abbr/${abbr}`;
    return FormDataApiInstance.get(url);
  },
  create(data) {
    const url = '/api/language';
    return FormDataApiInstance.post(url, data);
  },
  edit(id, data) {
    const url = `/api/language/${id}`;
    return FormDataApiInstance.patch(url, data);
  },
  remove(id) {
    const url = `/api/language/${id}`;
    return FormDataApiInstance.delete(url);
  }
};
