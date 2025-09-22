"use client";
import React from "react";
import UserAddressCard from "../user-profile/UserAddressCard";
import UserInfoCard from "../user-profile/UserInfoCard";
import UserMetaCard from "../user-profile/UserMetaCard";

// User data interface - applications provide this structure
export interface UserProfileData {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role?: string;
  department?: string;
  joinDate?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  stats?: {
    totalProjects?: number;
    completedTasks?: number;
    activeClients?: number;
  };
}

// Handler functions - applications provide business logic
export interface UserProfileHandlers {
  onSave?: (data: Partial<UserProfileData>) => Promise<void>;
  onCancel?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

// Configuration for customization
export interface UserProfileConfig {
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  allowAddressEdit?: boolean;
  customActions?: React.ReactNode;
  customSections?: React.ReactNode;
  title?: string;
}

interface UserProfilePageProps {
  userData: UserProfileData; // Required - application provides user data
  handlers?: UserProfileHandlers; // Optional - application provides business logic
  config?: UserProfileConfig; // Optional - application can customize behavior
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ 
  userData, 
  handlers = {},
  config = {} 
}) => {
  const {
    showEditButton = true,
    showDeleteButton = false,
    allowAddressEdit = true,
    customActions,
    customSections,
    title = "Profile"
  } = config;

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex items-center justify-between mb-5 lg:mb-7">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {customActions && (
            <div className="flex items-center gap-2">
              {customActions}
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          <UserAddressCard />
          
          {customSections}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;