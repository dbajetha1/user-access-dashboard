export type User = {
  id: string;
  name: string;
  email: string;
  isManager: boolean;
  access: {
    adGroups: string[];
    oktaApps: { name: string; purpose: string }[];
    gcpProjects: { name: string; role: string }[];
  };
};