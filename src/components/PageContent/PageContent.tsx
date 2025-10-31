import type { ReactNode } from "react";
import "./PageContent.scss";

interface PageContentProps {
  children?: ReactNode;
}

export const PageContent = ({ children }: PageContentProps) => {
  return <main className="main">{children}</main>;
};
