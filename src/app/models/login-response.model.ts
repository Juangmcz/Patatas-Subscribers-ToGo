import { Feature } from './feature.model';
import { Permission } from './permission.model';
import { Preference } from './preference.model';

export interface LoginResponse {
  Status: number
  Token: string
  Message: any
  TwoFactorType: any
  AllowedTwoFactorTypes: any
  Permissions: Permission[]
  Features: Feature[]
  Locations: any[]
  LastLocationId: number
  Preferences: Preference[]
  UserType: string
  Email: string
  FirstName: string
  LastName: string
  CompanyName: string
  TimeZoneInfo: any
  RefreshToken: string
}
