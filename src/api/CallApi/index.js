import { DefaultApiInstance } from '@/api';

export const CallApi = {
  getToken(identity) {
    const url = `/api/calls/token?identity=identity${identity}`;
    return DefaultApiInstance.get(url);
  },
};