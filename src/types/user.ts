export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'Admin' | 'Client' | 'Tester' | 'Employee';
    purchaseHistory: string[];
    testSubjectStatus: boolean;
    allergicReactions: string;
  }