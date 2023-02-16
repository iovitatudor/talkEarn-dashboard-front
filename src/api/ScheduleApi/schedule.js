import {DefaultApiInstance} from '@/api';

export const ScheduleApi = {
  createSchedule(data) {
    const url = '/api/schedule';
    return DefaultApiInstance.post(url, data);
  },
  removeSchedule(expertId) {
    const url = `/api/schedule/${expertId}`;
    return DefaultApiInstance.delete(url);
  },
  getSchedule(expertId) {
    const url = `/api/schedule/${expertId}`;
    return DefaultApiInstance.get(url);
  },
  getScheduleTemplate(day, expertId) {
    const url = `/api/schedule/template/${day}/${expertId}`;
    return DefaultApiInstance.get(url);
  },
  getScheduleTemplates(expertId) {
    const url = `/api/schedule/templates/${expertId}`;
    return DefaultApiInstance.get(url);
  },
};