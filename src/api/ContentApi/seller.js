import { DefaultApiInstance } from '@/api';

export const SellerApi = {
  getAll() {
    const url = `/api/sellers`;
    return DefaultApiInstance.get(url);
  },
  getById(id) {
    const url = `/api/seller/${id}`;
    return DefaultApiInstance.get(url);
  },
  getByExpertId(id) {
    const url = `/api/seller/expert/${id}`;
    return DefaultApiInstance.get(url);
  },
  create(data) {
    const url = '/api/seller';
    return DefaultApiInstance.post(url, data);
  },
  edit(id, data) {
    const url = `/api/seller/${id}`;
    return DefaultApiInstance.patch(url, data);
  },
  remove(id) {
    const url = `/api/seller/${id}`;
    return DefaultApiInstance.delete(url);
  },
};