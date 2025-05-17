
export type UserRole = 'top_management' | 'business_head' | 'rm_head' | 'relationship_manager';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileImageUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string, token: string) => Promise<void>;
}
