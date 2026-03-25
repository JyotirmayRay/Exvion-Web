export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  createdAt: Date;
}

export type AdminRole = 'admin' | 'superadmin' | 'viewer';
