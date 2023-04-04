import { DefaultApiInstance } from '@/api';

export const OrderApi = {
  getAll() {
    const url = `/api/sellers`;
    return DefaultApiInstance.get(url);
  },
  createOrder(data) {
    const url = `/api/order`;
    return DefaultApiInstance.post(url, data);
  },
};