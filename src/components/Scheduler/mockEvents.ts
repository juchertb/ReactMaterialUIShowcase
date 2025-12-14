export type SchedulerEvent = {
  id: string
  date: string // yyyy-MM-dd
  label: string
  startHour?: string // HH:mm
  category: SchedulerEventCategory
}

export type SchedulerEventCategory = {
  id: string
  label: string
  chipColor: string
  icon: CategoryIconEnum
}

export enum CategoryIconEnum {
  Eat = 'FastFood',
  Code = 'Computer',
  Sleep = 'Hotel',    
  Repeat = 'Repeat',
  Meet = 'Groups',
  Call = 'LocalPhone',
  Review = 'RateReview',
  Onboarding = 'PersonAdd'
};

const today = new Date();
const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);
const pad = (n: number) => String(n).padStart(2, '0');
const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;

export const mockEventsCategories: SchedulerEventCategory[] = [
  { id: '1', label: 'Meeting', chipColor: '#02d3f8ff', icon: CategoryIconEnum.Meet },
  { id: '2', label: 'Call', chipColor: '#33f802ff', icon: CategoryIconEnum.Call },
  { id: '3', label: 'Review', chipColor: '#f8022bff', icon: CategoryIconEnum.Review },
  { id: '4', label: 'Onboarding', chipColor: '#f8c902ff', icon: CategoryIconEnum.Onboarding },
  { id: '5', label: 'Eat', chipColor: '#7cb8fdff', icon: CategoryIconEnum.Eat },
  { id: '6', label: 'Code', chipColor: '#b3faa1ff', icon: CategoryIconEnum.Code },
  { id: '7', label: 'Sleep', chipColor: '#ff96a8ff', icon: CategoryIconEnum.Sleep },
  { id: '8', label: 'Repeat', chipColor: '#f3e39dff', icon: CategoryIconEnum.Repeat }
]

export const mockEvents: SchedulerEvent[] = [
  { id: '1', date: fmt(today), label: 'Team standup', startHour: '09:00', category: mockEventsCategories[0] },
  { id: '2', date: fmt(today), label: 'Client call', startHour: '11:00', category: mockEventsCategories[1] },
  { id: '3', date: fmt(new Date(today.getFullYear(), today.getMonth(), today.getDate()+2)), label: 'Design review', startHour: '14:00', category: mockEventsCategories[2] },
  { id: '4', date: fmt(new Date(today.getFullYear(), today.getMonth(), today.getDate()-3)), label: 'Onboarding', startHour: '10:00', category: mockEventsCategories[3]  }, 
  { id: '5', date: fmt(today), label: 'Status meeting', startHour: '09:30', category: mockEventsCategories[0]  },
  { id: '6', date: fmt(tomorrow), label: 'Eat because you need strength', startHour: '09:00', category: mockEventsCategories[4]  },
  { id: '7', date: fmt(tomorrow), label: 'Code because it is awesome', startHour: '10:00', category: mockEventsCategories[5] },
  { id: '8', date: fmt(tomorrow), label: 'Rest because you need rest', startHour: '21:30', category: mockEventsCategories[6] },
  { id: '9', date: fmt(tomorrow), label: 'Repeat because this is the life you love!', startHour: '23:59', category: mockEventsCategories[7]  }, 
  { id: '10', date: fmt(tomorrow), label: 'Code review', startHour: '10:30', category: mockEventsCategories[5] },
] 

export default mockEvents
