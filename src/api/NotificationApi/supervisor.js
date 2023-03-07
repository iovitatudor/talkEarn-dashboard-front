import {DefaultApiInstance} from '@/api';

export const SupervisorApi = {
  createRequestToAssign(data) {
    const url = `/api/notifications/supervisor`;
    return DefaultApiInstance.post(url, data);
  },
  getAll(expertId) {
    const url = `/api/notifications/supervisors/${expertId}?status=opened`;
    return DefaultApiInstance.get(url);
  },
  allowSupervisorRequest(notificationId) {
    const url = `/api/notifications/supervisor/allow/${notificationId}`;
    return DefaultApiInstance.patch(url);
  },
  deleteSupervisorNotification(notificationId) {
    const url = `/api/notifications/supervisor/${notificationId}`;
    return DefaultApiInstance.delete(url);
  },
};