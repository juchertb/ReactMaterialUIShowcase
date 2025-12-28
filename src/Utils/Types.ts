export type Product = {
  id: number;
  category_id: number;
  category_name: string;
  reference: string;
  width: number;
  height: number;
  price: number;
  thumbnail: string;
  image: string;
  description: string;
  stock: number;
  sales: number;
  collection_id: number;
  collection_name: string;
  color_id: number;
  color_name: string;
  shopify_handle: string;
  facebook_account: string;
  instagram_account: string;
  tags: string[];
  sku: string;
  currency: string;
};

export type Customer = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  zipcode: string;
  city: string;
  avatar: string;
  birthday: Date;
  first_seen: Date;
  last_seen: Date;
  has_ordered: boolean;
  latest_purchase: Date | null;
  has_newsletter: boolean;
  groups: string[];
  nb_commands: number;
  total_spent: number;
  home_phone: string;
  mobile_phone: string;
  position: string;
  twitter_url: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  sex: string;

  age: number;
  joinDate: Date;
  role: string;
  gender: Gender;
};

export enum Gender {
  None = 0,
  Male = 1,
  Female = 2
};

/*
  Scheduler types
*/
export type SchedulerEvent = {
  id: string
  date: string // yyyy-MM-dd
  title: string
  startHour?: string // HH:mm
  category: SchedulerEventCategory
  organizer: string
  details: string
  isAllDay: boolean
  isRepeated: boolean
  repeatInterval: string
  repeatEvery: number
  repeatOnWeekday: number
  repeatEnd: "never" | "on" | "after"
  repeatEndOn: number
  repeatEndAfter: string
}

export type SchedulerEventCategory = {
  id: string
  label: string
  chipColor: string
  icon: SchedulerEventCategoryIconEnum
}

export enum SchedulerEventCategoryIconEnum {
  Eat = 'FastFood',
  Code = 'Computer',
  Sleep = 'Hotel',    
  Repeat = 'Repeat',
  Meet = 'Groups',
  Call = 'LocalPhone',
  Review = 'RateReview',
  Onboarding = 'PersonAdd'
};

export const SchedulerEventCategories: SchedulerEventCategory[] = [
  { id: '1', label: 'Meeting', chipColor: '#02d3f8ff', icon: SchedulerEventCategoryIconEnum.Meet },
  { id: '2', label: 'Call', chipColor: '#33f802ff', icon: SchedulerEventCategoryIconEnum.Call },
  { id: '3', label: 'Review', chipColor: '#f8022bff', icon: SchedulerEventCategoryIconEnum.Review },
  { id: '4', label: 'Onboarding', chipColor: '#f8c902ff', icon: SchedulerEventCategoryIconEnum.Onboarding },
  { id: '5', label: 'Eat', chipColor: '#7cb8fdff', icon: SchedulerEventCategoryIconEnum.Eat },
  { id: '6', label: 'Code', chipColor: '#b3faa1ff', icon: SchedulerEventCategoryIconEnum.Code },
  { id: '7', label: 'Sleep', chipColor: '#ff96a8ff', icon: SchedulerEventCategoryIconEnum.Sleep },
  { id: '8', label: 'Repeat', chipColor: '#f3e39dff', icon: SchedulerEventCategoryIconEnum.Repeat }
]
