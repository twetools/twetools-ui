"use client";
import React from "react";
import ModalAlert, { ModalAlertProps } from "./ModalAlert";

interface ModalAlertSuccessProps
  extends Omit<
    ModalAlertProps,
    "icon" | "buttonClassName" | "iconBackgroundClassName"
  > {
  buttonText?: string;
}

export default function ModalAlertSuccess({
  buttonText = "Okay, Great!",
  ...props
}: ModalAlertSuccessProps) {
  const successIcon = (
    <svg
      className="fill-success-600 dark:fill-success-500"
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.9375 19.0004C5.9375 11.7854 11.7864 5.93652 19.0014 5.93652C26.2164 5.93652 32.0653 11.7854 32.0653 19.0004C32.0653 26.2154 26.2164 32.0643 19.0014 32.0643C11.7864 32.0643 5.9375 26.2154 5.9375 19.0004ZM19.0014 2.93652C10.1296 2.93652 2.9375 10.1286 2.9375 19.0004C2.9375 27.8723 10.1296 35.0643 19.0014 35.0643C27.8733 35.0643 35.0653 27.8723 35.0653 19.0004C35.0653 10.1286 27.8733 2.93652 19.0014 2.93652ZM24.7855 17.0575C25.3713 16.4717 25.3713 15.522 24.7855 14.9362C24.1997 14.3504 23.25 14.3504 22.6642 14.9362L17.7177 19.8827L15.3387 17.5037C14.7529 16.9179 13.8031 16.9179 13.2173 17.5037C12.6316 18.0894 12.6316 19.0392 13.2173 19.625L16.657 23.0647C16.9383 23.346 17.3199 23.504 17.7177 23.504C18.1155 23.504 18.4971 23.346 18.7784 23.0647L24.7855 17.0575Z"
        fill=""
      />
    </svg>
  );

  return (
    <ModalAlert
      {...props}
      icon={successIcon}
      buttonText={buttonText}
      buttonClassName="bg-success-500 hover:bg-success-600"
      iconBackgroundClassName="fill-success-50 dark:fill-success-500/15"
    />
  );
}
