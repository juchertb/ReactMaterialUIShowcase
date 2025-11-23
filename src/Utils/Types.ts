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
