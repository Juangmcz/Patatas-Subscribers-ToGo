import { Feature } from './feature.model';
import { Permission } from './permission.model';
import { Preference } from './preference.model';

export interface Response {
  status: number;
  token: string;
  message: any;
  twoFactorType: any;
  allowedTwoFactorTypes: any;
  permissions: Permission[];
  features: Feature[];
  locations: any[];
  lastLocationId: number;
  preferences: Preference[];
  userType: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  timeZoneInfo: any;
  refreshToken: string;
}
