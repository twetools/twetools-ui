import React from "react";
import PhoneField from "./PhoneField";
import { IconHome as HomeIcon } from "@tabler/icons-react";

const HomePhoneField: React.FC<
  Omit<React.ComponentProps<typeof PhoneField>, "fieldName" | "icon">
> = (props) => (
  <PhoneField {...props} fieldName="Home Phone" icon={<HomeIcon />} />
);

export default HomePhoneField;




