import { FormDataApiInstance } from '@/api';

export const CollectionApi = {
  getAll(languageAbbr) {
    const url = `/api/collections?lang=${languageAbbr}`;
    return FormDataApiInstance.get(url);
  },
  getById(id, languageAbbr) {
    const url = `/api/collection/${id}?lang=${languageAbbr}`;
    return FormDataApiInstance.get(url);
  },
  create(data) {
    const url = `/api/collection`;
    return FormDataApiInstance.post(url, data);
  },
  edit(id, data) {
    const url = `/api/collection/${id}`;
    return FormDataApiInstance.patch(url, data);
  },
  remove(id) {
    const url = `/api/collection/${id}`;
    return FormDataApiInstance.delete(url);
  }
};