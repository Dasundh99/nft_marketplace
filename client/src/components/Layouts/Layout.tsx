import React from "react";
import SideNav from "../SideNav/SideNav";
import Header from "../../pages/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="ml-20 flex min-h-screen bg-black text-white">
      <SideNav />
      <div className="flex flex-col flex-grow bg-black">
        <Header />
        <main className="flex-grow overflow-auto bg-black">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
