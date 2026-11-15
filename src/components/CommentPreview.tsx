import React from 'react';

export interface CommentPreviewProps {
  authorName: string;
  authorAvatarUrl: string;
  commentText: string;
}

export function CommentPreview({ authorName, authorAvatarUrl, commentText }: CommentPreviewProps) {
  return (
    <section>
      <img src={authorAvatarUrl} alt={`${authorName} avatar`} />
      <p>{commentText}</p>
    </section>
  );
}
