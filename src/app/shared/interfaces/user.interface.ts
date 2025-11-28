export interface Friend extends UserProfile {
  uniqueId: string;
}

export interface Group {
  id: number;
  name: string;
  uniqueId: string;
  description: string;
  membersCount: number;
  groupPhoto: string;
  isAdmin: boolean;
  lastActivity: string;
}

export interface User {
  userId: number;
  userName: string;
  profilePhoto: string;
  status?: 'online' | 'offline' | 'away';
}

export interface UserProfile extends User {
  nickName: string;
  email?: string;
  // city?: string;
  // country?: string;
  // friends: Friend[];
  // groups: Group[];
  // dateOfBirth?: Date | string;
  // phone?: string | number;
  notificationsEnabled?: boolean;
  realTimeUpdatesEnabled?: boolean;
}
