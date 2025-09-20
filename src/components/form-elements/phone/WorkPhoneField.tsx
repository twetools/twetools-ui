import React from "react";
import PhoneField from "./PhoneField";
import { IconBriefcase as WorkIcon } from "@tabler/icons-react";

const WorkPhoneField: React.FC<
  Omit<React.ComponentProps<typeof PhoneField>, "fieldName" | "icon">
> = (props) => (
  <PhoneField {...props} fieldName="Work Phone" icon={<WorkIcon />} />
);

export default WorkPhoneField;




