import {DefaultApiInstance} from '@/api';
import expert from "../../store/expert";

export const SupervisorApi = {
  createRequestToAssign(data) {
    const url = `/api/notifications/supervisor`;
    return DefaultApiInstance.post(url, data);
  },
  getAll(expertId) {
    const url = `/api/notifications/supervisors/${expertId}?status=opened`;
    return DefaultApiInstance.get(url);
  },
  // bookAppointment(data) {
  //   const url = `/api/appointment/book`;
  //   return DefaultApiInstance.post(url, data);
  // },
  // getReservedAppointment(appointmentId) {
  //   const url = `/api/appointment/book/${appointmentId}`;
  //   return DefaultApiInstance.get(url);
  // },
  // editBookAppointment(reservedAppointmentId, data) {
  //   const url = `/api/appointment/book/${reservedAppointmentId}`;
  //   return DefaultApiInstance.patch(url, data);
  // },
  // changeStatusAppointment(appointmentId, status) {
  //   const url = `/api/appointment/status/${appointmentId}/${status}`;
  //   return DefaultApiInstance.patch(url);
  // },
};