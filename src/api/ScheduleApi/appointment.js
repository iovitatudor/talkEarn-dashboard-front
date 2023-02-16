import {DefaultApiInstance} from '@/api';

export const AppointmentApi = {
  createSchedule(data) {
    const url = '/api/schedule';
    return DefaultApiInstance.post(url, data);
  },
  removeSchedule(expertId) {
    const url = `/api/schedule/${expertId}`;
    return DefaultApiInstance.delete(url);
  },
  getAppointments(expertId, date) {
    const url = `/api/appointments/${expertId}/${date}`;
    return DefaultApiInstance.get(url);
  },
};