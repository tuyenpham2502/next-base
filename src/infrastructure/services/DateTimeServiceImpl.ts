import type { DateTimeService } from '@/application/services/DateTimeService';
import { Constants } from '@/shared/constants';
import dayjs from 'dayjs';

export default class DateTimeServiceImpl implements DateTimeService {
  currentDateTime(format: string = Constants.DateTime.DateTimeFormat) {
    return dayjs(new Date()).format(format);
  }

  formatDateTime(date: string, format: string = Constants.DateTime.DateFormat) {
    return dayjs(new Date(date)).format(format);
  }
}
