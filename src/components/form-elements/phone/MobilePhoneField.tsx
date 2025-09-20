import React from "react";
import PhoneField from "./PhoneField";
import { IconDeviceMobile as MobilePhoneIcon } from "@tabler/icons-react";

const MobilePhoneField: React.FC<
  Omit<React.ComponentProps<typeof PhoneField>, "fieldName" | "icon">
> = (props) => (
  <PhoneField {...props} fieldName="Mobile Phone" icon={<MobilePhoneIcon />} />
);

export default MobilePhoneField;




