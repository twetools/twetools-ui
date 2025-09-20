import { getAllUsers } from "../../../../src/lib/users/actions";
import UserTable from "./UserTable";

export const metadata = {
  title: "User Management | Admin Examples | Twetools UI",
  description: "Example of user management functionality for admin interfaces.",
};

export default async function UserManagementExamplePage() {
  const users = await getAllUsers();
  return <UserTable users={users} />;
}
