import React from "react";
import SideNav from "../SideNav/SideNav";
import Header from "../../pages/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <SideNav />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
