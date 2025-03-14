import { ReactNode } from "react";

interface SocialProps {
  url: string;
  children: ReactNode;
}

export function Social({ url, children }: SocialProps) {
  return (
    <div>
      <a rel="noopener noreferrer" href={url} target="_blank">
        {children}
      </a>
    </div>
  );
}
