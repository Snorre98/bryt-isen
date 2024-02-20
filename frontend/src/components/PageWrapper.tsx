import { ReactNode } from 'react';
import '../styles/PageWrapper.css';
type PageWrapperProps = {
  children: ReactNode;
};

export function PageWrapper({ children }: PageWrapperProps) {
  return <div className="pageWrapper">{children}</div>;
}
