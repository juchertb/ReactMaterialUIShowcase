import { SchedulerEvent, SchedulerEventCategories} from '../../Utils/Types';

const today = new Date();
const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);
const pad = (n: number) => String(n).padStart(2, '0');
const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;

export const mockEvents: SchedulerEvent[] = [
  { id: '1', date: fmt(today), title: 'Team standup', startHour: '09:00', category: SchedulerEventCategories[0], organizer: null, details: null, isAllDay: false, isRepeated: false, repeatInterval: "Daily", repeatEvery: 1, repeatOnWeekday: 1, repeatEnd: "never", repeatEndOn: 1, repeatEndAfter: fmt(today) + ' 20"00' },
  { id: '2', date: fmt(today), title: 'Client call', startHour: '11:00', category: SchedulerEventCategories[1], organizer: null, details: null, isAllDay: false, isRepeated: false, repeatInterval: "Daily", repeatEvery: 1, repeatOnWeekday: 1, repeatEnd: "never", repeatEndOn: 1, repeatEndAfter: fmt(today) + ' 20"00' },
  { id: '3', date: fmt(new Date(today.getFullYear(), today.getMonth(), today.getDate()+2)), title: 'Design review', startHour: '14:00', category: SchedulerEventCategories[2], organizer: null, details: null, isAllDay: false, isRepeated: false, repeatInterval: "Daily", repeatEvery: 1, repeatOnWeekday: 1, repeatEnd: "never", repeatEndOn: 1, repeatEndAfter: fmt(today) + ' 20"00' },
  { id: '4', date: fmt(new Date(today.getFullYear(), today.getMonth(), today.getDate()-3)), title: 'Onboarding', startHour: '10:00', category: SchedulerEventCategories[3], organizer: null, details: null, isAllDay: false, isRepeated: false, repeatInterval: "Daily", repeatEvery: 1, repeatOnWeekday: 1, repeatEnd: "never", repeatEndOn: 1, repeatEndAfter: fmt(today) + ' 20"00'  }, 
  { id: '5', date: fmt(today), title: 'Status meeting', startHour: '09:30', category: SchedulerEventCategories[0], organizer: null, details: null, isAllDay: false, isRepeated: false, repeatInterval: "Daily", repeatEvery: 1, repeatOnWeekday: 1, repeatEnd: "never", repeatEndOn: 1, repeatEndAfter: fmt(today) + ' 20"00'  },
  { id: '6', date: fmt(tomorrow), title: 'Eat because you need strength', startHour: '09:00', category: SchedulerEventCategories[4], organizer: null, details: null, isAllDay: false, isRepeated: false, repeatInterval: "Daily", repeatEvery: 1, repeatOnWeekday: 1, repeatEnd: "never", repeatEndOn: 1, repeatEndAfter: fmt(today) + ' 20"00'  },
  { id: '7', date: fmt(tomorrow), title: 'Code because it is awesome', startHour: '10:00', category: SchedulerEventCategories[5], organizer: null, details: null, isAllDay: false, isRepeated: false, repeatInterval: "Daily", repeatEvery: 1, repeatOnWeekday: 1, repeatEnd: "never", repeatEndOn: 1, repeatEndAfter: fmt(today) + ' 20"00' },
  { id: '8', date: fmt(tomorrow), title: 'Rest because you need rest', startHour: '21:30', category: SchedulerEventCategories[6], organizer: null, details: null, isAllDay: false, isRepeated: false, repeatInterval: "Daily", repeatEvery: 1, repeatOnWeekday: 1, repeatEnd: "never", repeatEndOn: 1, repeatEndAfter: fmt(today) + ' 20"00' },
  { id: '9', date: fmt(tomorrow), title: 'Repeat because this is the life you love!', startHour: '23:59', category: SchedulerEventCategories[7], organizer: null, details: null, isAllDay: false, isRepeated: false, repeatInterval: "Daily", repeatEvery: 1, repeatOnWeekday: 1, repeatEnd: "never", repeatEndOn: 1, repeatEndAfter: fmt(today) + ' 20"00'  }, 
  { id: '10', date: fmt(tomorrow), title: 'Code review', startHour: '10:30', category: SchedulerEventCategories[5], organizer: null, details: null, isAllDay: false, isRepeated: false, repeatInterval: "Daily", repeatEvery: 1, repeatOnWeekday: 1, repeatEnd: "never", repeatEndOn: 1, repeatEndAfter: fmt(today) + ' 20"00' },
] 

export default mockEvents
