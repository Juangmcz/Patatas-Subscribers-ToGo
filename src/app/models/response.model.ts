export interface Response {
  status: number;
  token: string;
  message: string;
  twoFactorType: string;
  allowedTwoFactorTypes: string;
  permissions: [];
  userType: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  timeZoneInfo: string;
  refreshToken: string;
}
