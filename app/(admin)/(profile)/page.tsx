import UserProfilePage from "../../../src/components/pages/UserProfilePage";
import type { UserProfileData } from "../../../src/components/pages/UserProfilePage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile Demo | twetools-ui Component Library",
  description:
    "Demonstration of the UserProfilePage component from twetools-ui library",
};

// Example user data - in a real application, this would come from an API/database
const exampleUserData: UserProfileData = {
  id: 1,
  name: "Troy Edwards",
  email: "troy@troyedwardshomes.com",
  phone: "+1 (555) 123-4567",
  avatar: "/images/user/owner.jpg",
  role: "Real Estate Agent",
  department: "Sales",
  joinDate: "2022-01-15",
  address: {
    line1: "123 Main Street",
    line2: "Suite 400",
    city: "Nashville",
    state: "TN",
    zipCode: "37201",
    country: "USA"
  },
  stats: {
    totalProjects: 45,
    completedTasks: 128,
    activeClients: 12
  }
};

export default function Profile() {
  // Example handlers - in a real application, these would call APIs
  const handleSave = async (data: Partial<UserProfileData>) => {
    console.log("Saving profile data:", data);
    // await api.updateProfile(data);
  };

  const handleEdit = () => {
    console.log("Edit profile clicked");
  };

  const handleCancel = () => {
    console.log("Cancel edit clicked");
  };

  return (
    <UserProfilePage
      userData={exampleUserData}
      handlers={{
        onSave: handleSave,
        onEdit: handleEdit,
        onCancel: handleCancel
      }}
      config={{
        title: "User Profile Demo",
        showEditButton: true,
        showDeleteButton: false,
        allowAddressEdit: true,
        customActions: (
          <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded border border-blue-200 dark:border-blue-800">
            Demo Mode
          </div>
        )
      }}
    />
  );
}
