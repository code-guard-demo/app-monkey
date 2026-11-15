import React from 'react';

export interface UserAlertProps {
  iconUrl: string;
  rawHtml: string;
}

export function UserAlert({ iconUrl, rawHtml }: UserAlertProps) {
  return (
    <div role="alert">
      <img src={iconUrl} />
      <span dangerouslySetInnerHTML={{ __html: rawHtml }} />
    </div>
  );
}
