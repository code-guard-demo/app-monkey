import React from 'react';

export interface CommentPreviewProps {
  authorAvatarUrl: string;
  rawHtmlComment: string;
}

export function CommentPreview({ authorAvatarUrl, rawHtmlComment }: CommentPreviewProps) {
  return (
    <section>
      <img src={authorAvatarUrl} />
      <div dangerouslySetInnerHTML={{ __html: rawHtmlComment }} />
    </section>
  );
}
