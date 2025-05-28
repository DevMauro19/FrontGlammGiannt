export enum UserRole {
  ADMIN = 'Admin',
  CLIENT = 'Client',
  TESTER = 'Tester',
  EMPLOYEE = 'Employee',
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  purchaseHistory: string[];
  testSubjectStatus: boolean;
  allergicReactions: string;
}
