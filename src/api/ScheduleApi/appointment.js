import {DefaultApiInstance} from '@/api';

export const AppointmentApi = {
  getAppointments(expertId, date) {
    const url = `/api/appointments/${expertId}/${date}`;
    return DefaultApiInstance.get(url);
  },
  bookAppointment(data) {
    const url = `/api/appointment/book`;
    return DefaultApiInstance.post(url, data);
  },
  getReservedAppointment(appointmentId) {
    const url = `/api/appointment/book/${appointmentId}`;
    return DefaultApiInstance.get(url);
  },
  editBookAppointment(reservedAppointmentId, data) {
    const url = `/api/appointment/book/${reservedAppointmentId}`;
    return DefaultApiInstance.patch(url, data);
  },
  changeStatusAppointment(appointmentId, status) {
    const url = `/api/appointment/status/${appointmentId}/${status}`;
    return DefaultApiInstance.patch(url);
  },
};