import React from 'react';

export interface UserAlertProps {
  iconUrl: string;
  iconLabel: string;
  message: string;
}

export function UserAlert({ iconUrl, iconLabel, message }: UserAlertProps) {
  return (
    <div role="alert">
      <img src={iconUrl} alt={iconLabel} />
      <span>{message}</span>
    </div>
  );
}
