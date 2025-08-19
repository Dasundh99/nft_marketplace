import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import Sidebar from "../components/UserProfile/UserProfile";

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1>NFThrive</h1>
      <p className="text-gray-400 mb-3">Connect With NFThrive</p>

      <WalletMultiButton></WalletMultiButton>
    </div>
  );
};
export default Profile;
