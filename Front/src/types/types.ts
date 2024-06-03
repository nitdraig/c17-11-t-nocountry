export interface IRole {
  _id: string;
  name: string;
}
export interface ISelectInput {
  placeholder?: string;
  onChange: (category: string) => void;
  target: InputEvent;
}

export interface Service {
  name: string;
  description: string;
  price: number;
}
export interface AppDetail {
  imageSrc: string;
  description: string;
}

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  description: string;
  services: Service[];
  time: string;
  address: string;
  phone: string;
  picture: string;
}

export interface Testimonial {
  name: string;
  role: string;
  imageSrc: string;
  description: string;
}
